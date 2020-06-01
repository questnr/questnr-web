import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommunityMembersService } from '../../../../community-users/community-members.service';
import { User } from '../../../../models/user.model';
import { UserFollowersService } from '../../../../user-followers/user-followers.service';
import { UserProfileCardServiceComponent } from '../../../../user-profile-card/user-profile-card-service.component';
import { UserListService } from './user-list.service';
import { Page } from 'models/page.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild("elementOnHTML") elementOnHTML: ElementRef;
  loading = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public userProfileCardServiceComponent: UserProfileCardServiceComponent,
    // tslint:disable-next-line:max-line-length
    public userListService: UserListService, public dialogRef: MatDialogRef<UserListComponent>, public followersService: UserFollowersService,
    public communityMembersService: CommunityMembersService) {
  }

  userList: User[] = [];
  searchResultList: User;
  searchResult = false;
  noResultFound = false;
  mobileView = false;
  endOfResult = false;
  page = 0;
  screenWidth = window.innerWidth;
  scrollCached: boolean = null;

  ngOnInit(): void {
    this.fetchData();
  }
  ngAfterViewInit() {
    window.addEventListener('scroll', this.scroll, true);
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
  }

  scroll = (event): void => {
    event.preventDefault();
    if (!this.scrollCached) {
      setTimeout(() => {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 300) {
          // console.log('no im  here');
          if (this.userList.length >= 0 && !this.endOfResult) {
            // console.log('check network call');
            this.loading = true;
            ++this.page;
            this.fetchData();
          }
        }
        this.scrollCached = null;
      }, 100);
    }
    this.scrollCached = event;
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  fetchData() {
    if (this.data.type === 'following') {
      this.getFollowingUser(this.data.userId);
    } else if (this.data.type === 'followers') {
      this.getUserFollowers(this.data.userId);
    } else if (this.data.type === 'like') {
      this.getUserLikedList(this.data.postId);
    } else if (this.data.type === "members") {
      this.getCommunityMembers(this.data.communitySlug);
    }
  }

  getUserImage(src) {
    if (src == null) {
      return 'assets/default.jpg';
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  getFollowers(userId) {
    // console.log('test userId', userId);
    if (!userId) return;
    this.followersService.getUserFollowers(userId, this.page).subscribe((res: any) => {
      if (res.content.length) {
        res.content.forEach(user => {
          this.userList.push(user);
        });
      } else {
        this.endOfResult = true;
        this.loading = false;
      }
      // console.log('follower content', this.userList);
    }, error => {
      // console.log(error.error.errorMessage);
      this.loading = false;
    });
  }

  getUserFollowers(userId) {
    if (!userId) return;
    this.followersService.getUserFollowers(userId, this.page).subscribe((res: any) => {
      // console.log('followed content' + res.content);
      if (res.content.length) {
        res.content.forEach(user => {
          this.userList.push(user);
          this.loading = false;
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
    if (!userId) return;
    this.followersService.getFollowedBy(userId, this.page).subscribe((res: any) => {
      // console.log('followed content' + res.content);
      if (res.content.length) {
        res.content.forEach(user => {
          this.userList.push(user);
          this.loading = false;
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
    if (!postId) return;
    this.followersService.getUserLikedList(postId, this.page).subscribe((res: any) => {
      // console.log('liked content', res);
      if (res.content.length) {
        res.content.forEach(userLikedData => {
          this.userList.push(userLikedData.user);
          this.loading = false;
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
    if (!communitySlug) return;
    this.loading = true;
    this.communityMembersService.getCommunityMembers(communitySlug, this.page).subscribe((data: any) => {
      if (data.content.length) {
        data.content.forEach(user => {
          this.userList.push(user);
          this.loading = false;
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
}
