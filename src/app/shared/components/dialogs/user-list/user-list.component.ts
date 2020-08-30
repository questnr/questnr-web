import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommunityService } from 'community/community.service';
import { GlobalService } from 'global.service';
import { CommunityUsers } from 'models/community.model';
import { LikeAction } from 'models/like-action.model';
import { Page } from 'models/page.model';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { InviteUsetService } from 'shared/user-list-view/invite-user.service';
import { CommunityMembersService } from '../../../../community-users/community-members.service';
import { User } from '../../../../models/user.model';
import { UserFollowersService } from '../../../../user-followers/user-followers.service';
import { UserProfileCardServiceComponent } from '../../../../user-profile-card/user-profile-card-service.component';
import { UserListService } from './user-list.service';
import { UserListData, UserListType } from 'models/user-list.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild('elementOnHTML') elementOnHTML: ElementRef;
  listTitle: string;
  loading: boolean = false;
  isInviteList: boolean = false;
  communityId: number;
  isCommunityRequest: boolean = false;
  userList: any[] = [];
  searchResultList: User;
  searchResult = false;
  noResultFound = false;
  mobileView = false;
  endOfResult = false;
  page: number = 0;
  hasTotalPage: number;
  scrollCached: boolean = null;
  title: string;
  @ViewChild("listContainer") listContainer: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: UserListData,
    public userProfileCardServiceComponent: UserProfileCardServiceComponent,
    // tslint:disable-next-line:max-line-length
    public userListService: UserListService,
    public dialogRef: MatDialogRef<UserListComponent>,
    public followersService: UserFollowersService,
    public communityMembersService: CommunityMembersService,
    public auth: CommunityService,
    private inviteUserService: InviteUsetService,
    private _globalService: GlobalService) {
  }

  ngOnInit(): void {
    if (this.data?.title) {
      this.title = this.data.title;
    }
  }

  ngAfterViewInit() {
    this.loading = true;
    this.fetchData();
    this.listContainer.nativeElement.addEventListener('scroll', this.onScroll, true);
    this.mobileView = this._globalService.isMobileView();
    let timer = setInterval(() => {
      if (!this.loading) {
        clearInterval(timer);
        if (this.hasTotalPage > this.page) {
          this.loading = true;
          // ++this.page;
          this.fetchData();
        }
      }
    }, 1000);
  }

  onScroll = (event): void => {
    if (!this.scrollCached) {
      setTimeout(() => {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 300) {
          // console.log('no im  here');
          if (this.userList.length >= 0 && !this.endOfResult) {
            // console.log('check network call');
            if (!this.loading && this.hasTotalPage > this.page) {
              this.loading = true;
              this.fetchData();
            }
          }
        }
        this.scrollCached = null;
      }, 100);
    }
    this.scrollCached = event;
  };

  ngOnDestroy() {
    this.listContainer.nativeElement.removeEventListener('scroll', this.onScroll, true);
  }

  fetchData() {
    if (this.data.type === UserListType.following) {
      this.listTitle = "Following To";
      this.getFollowingUser(this.data.user.userId);
    } else if (this.data.type === UserListType.followers) {
      this.listTitle = "Followers";
      this.getUserFollowers(this.data.user.userId);
    } else if (this.data.type === UserListType.like) {
      this.listTitle = "User Likes";
      this.getUserLikedList(this.data.postId);
    } else if (this.data.type === UserListType.members) {
      this.listTitle = "Members";
      this.getCommunityMembers(this.data.community.slug);
    } else if (this.data.type === UserListType.requests) {
      this.listTitle = "Requests";
      this.isCommunityRequest = true;
      this.communityId = this.data.community.communityId;
      this.getCommunityJoinRequests(this.data.community.communityId);
    } else if (this.data.type === UserListType.inviteUserList) {
      this.listTitle = "Users";
      // To show invite button
      this.isInviteList = true;
      // console.log('this', this.data);
      this.communityId = this.data.community.communityId;
      this.getInviteUserList(this.communityId);
    }
  }

  getUserImage(src) {
    if (src == null) {
      return StaticMediaSrc.userFile;
    } else {
      return src;
    }
  }

  follow(id) {
    this.userProfileCardServiceComponent.followMe(id).subscribe((res: any) => {
      // console.log(res);
    }, error => {
      // console.log(error.error.errorMessage);
    });
  }

  searchUserList(searchString) {
    this.noResultFound = false;
    this.loading = true;
    // tslint:disable-next-line:triple-equals
    if (searchString != '') {
      setTimeout(() => {
        this.userListService.searchUser(searchString).subscribe((res: any) => {
          // console.log('serach resuult for :' + searchString + 'is===', res);
          this.searchResultList = res.content;
          this.searchResult = true;
          if (res.content.length === 0) {
            this.noResultFound = true;
          } else {
            this.noResultFound = false;
          }
          this.loading = false;
        }, error => {
          // console.log(error.error.errorMessage);
          this.searchResult = false;
          this.loading = false;
          this.noResultFound = true;
        });
      }, 2000);
    } else {
      this.loading = false;
      this.searchResult = false;
    }
  }

  backActionListener() {
    this.dialogRef.close();
  }

  getUserFollowers(userId) {
    if (!userId) {
      return;
    }
    this.followersService.getUserFollowers(userId, this.page).subscribe((res: Page<User>) => {
      // console.log('getUserFollowers', res);
      if (res.content.length) {
        this.afterDataFetched(res.totalPages);
        res.content.forEach(user => {
          this.userList.push(user);
        });
      } else {
        this.loading = false;
        this.endOfResult = true;
      }
      // console.log('follower content', this.userList);
    }, error => {
      // console.log(error.error.errorMessage);
      this.loading = false;
    });
  }

  getFollowingUser(userId) {
    if (!userId) {
      return;
    }
    this.followersService.getFollowedBy(userId, this.page).subscribe((res: Page<User>) => {
      // console.log('getFollowingUser', res);
      if (res.content.length) {
        this.afterDataFetched(res.totalPages);
        res.content.forEach(user => {
          this.userList.push(user);
        });
      } else {
        this.loading = false;
        this.endOfResult = true;
      }
      // console.log('follower content', this.userList);
    }, error => {
      // console.log(error.error.errorMessage);
      this.loading = false;
    });
  }

  getUserLikedList(postId) {
    if (!postId) {
      return;
    }
    this.followersService.getUserLikedList(postId, this.page).subscribe((res: Page<LikeAction>) => {
      // console.log('liked content', res);
      if (res.content.length) {
        this.afterDataFetched(res.totalPages);
        res.content.forEach(userLikedData => {
          this.userList.push(userLikedData.user);
        });
      } else {
        this.loading = false;
        this.endOfResult = true;
      }
      // console.log('follower content', this.userList);
    }, error => {
      // console.log(error.error.errorMessage);
      this.loading = false;
    });
  }


  getCommunityMembers(communitySlug: string) {
    if (!communitySlug) {
      return;
    }
    this.communityMembersService.getCommunityMembers(communitySlug, this.page).subscribe((data: Page<User>) => {
      if (data.content.length) {
        this.afterDataFetched(data.totalPages);
        data.content.forEach(user => {
          this.userList.push(user);
        });
      } else {
        this.loading = false;
        this.endOfResult = true;
      }
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  getCommunityJoinRequests(communityId) {
    if (!communityId) return;
    this.auth.getCommunityJoinRequests(communityId, this.page).subscribe((res: any) => {
      if (res.content.length) {
        this.afterDataFetched(res.totalPages);
        res.content.forEach(user => {
          this.userList.push(user);
        });
      } else {
        this.loading = false;
        this.endOfResult = true;
      }
    });
  }

  getInviteUserList(communityId) {
    if (!communityId) {
      return;
    }
    this.inviteUserService.getInviteUserList(communityId, this.page).subscribe((res: any) => {
      // console.log('getUserFollowers', res);
      if (res.content.length) {
        this.afterDataFetched(res.totalPages);
        res.content.forEach(user => {
          this.userList.push(user);
        });
      } else {
        this.loading = false;
        this.endOfResult = true;
      }
      // console.log('follower content', this.userList);
    }, error => {
      // console.log(error.error.errorMessage);
      this.loading = false;
    });
  }

  afterDataFetched(totalPages) {
    this.hasTotalPage = totalPages;
    this.page++;
    this.loading = false;
  }
}
