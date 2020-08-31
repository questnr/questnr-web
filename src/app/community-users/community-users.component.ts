import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {GlobalService} from 'global.service';
import {RelationType} from 'models/relation-type';
import {UserListViewSizeType, UserListData, UserListType} from 'models/user-list.model';
import {of, Subscription} from 'rxjs';
import {GlobalConstants} from 'shared/constants';
import {StaticMediaSrc} from 'shared/constants/static-media-src';
import {environment} from '../../environments/environment';
import {LoginService} from '../auth/login.service';
import {CommunityService} from '../community/community.service';
import {CommunityProfileMeta, Community} from '../models/community.model';
import {User} from '../models/user.model';
import {UserListComponent} from '../shared/components/dialogs/user-list/user-list.component';
import {UserProfileCardServiceComponent} from '../user-profile-card/user-profile-card-service.component';
import {CommunityMembersService} from './community-members.service';
import {Page} from 'models/page.model';

@Component({
  selector: 'app-community-users',
  templateUrl: './community-users.component.html',
  styleUrls: ['./community-users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommunityUsersComponent implements OnInit {
  baseUrl = environment.baseUrl;
  @Input() community: Community;
  @Input() userListType;
  @Input() ownerUser: User;
  @Input() relationshipType: RelationType;
  @Input() requests = 1;
  @Output() pendingRequestCount = new EventEmitter();
  fetchCommunityMembersSubscriber: Subscription;
  isAllowedIntoCommunity: boolean;
  communityMemberList: User[] = [];
  loader = false;
  mobileView = false;
  numberOfMembers: number;
  loggedInUserId;
  owned: string = RelationType.OWNED;
  followed: string = RelationType.FOLLOWED;
  none: string = RelationType.NONE;
  pendingJoinRequest: any;
  pendingRequests = 0;
  smallUserListViewSize: UserListViewSizeType = UserListViewSizeType.small;
  userListTypeClass = UserListType;

  constructor(public http: HttpClient,
              public userService: UserProfileCardServiceComponent,
              public loginService: LoginService,
              public route: ActivatedRoute,
              public dialog: MatDialog,
              public communityMembersService: CommunityMembersService,
              private loginAuth: LoginService,
              private _globalService: GlobalService,
              public communityService: CommunityService) {
    this.loggedInUserId = this.loginAuth.getUserProfile().id;
  }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
    this.isAllowedIntoCommunity = this.communityService.isAllowedIntoCommunityWithRelationType(this.community.communityMeta.relationShipType);
    if (this.isAllowedIntoCommunity) {
      this.getCommunityMembers();
      // this.getCommunityMetaInfo(this.communitySlug);
    } else {
      this.restartCommunityMembersList();
      this.getCommunityMetaInfo();
    }
    if (this.community.communityMeta.relationShipType === RelationType.OWNED) {
      this.getCommunityJoinRequests();
    }
  }
  restartCommunityMembersList() {
    this.communityMemberList = [];
    if (this.fetchCommunityMembersSubscriber) {
      this.fetchCommunityMembersSubscriber.unsubscribe();
      this.isAllowedIntoCommunity = this.communityService.isAllowedIntoCommunity(this.community);
    }
  }
  // ngAfterViewInit() {`
  //
  // }

  ngOnChanges(changes: SimpleChanges) {
    // console.log("changes", changes);
    if ((changes.community || changes.relationshipType)) {
      if (changes?.community?.currentValue) {
        this.community = changes.community.currentValue;
      }
      if (changes?.relationshipType?.currentValue) {
        this.relationshipType = changes.relationshipType.currentValue;
      }
      this.isAllowedIntoCommunity = this.communityService.isAllowedIntoCommunityWithRelationType(this.community.communityMeta.relationShipType);
      if (this.isAllowedIntoCommunity) {
        this.getCommunityMembers();
      }
    }
  }

  getCommunityMembers() {
    this.loader = true;
    this.fetchCommunityMembersSubscriber = this.communityMembersService.getCommunityMembers(this.community.slug, 0).subscribe((data: Page<User>) => {
      this.loader = false;
      this.communityMemberList = data.content;
      this.numberOfMembers = data.totalElements;
      // console.log("getCommunityMembers", data);
    }, error => {
      // console.log('something went wrong while fetching community Members.');
      this.loader = false;
    });
  }

  getCommunityMetaInfo() {
    this.communityMembersService.getCommunityMetaInfoWithParams(this.community.slug, 'followers')
      .subscribe((data: CommunityProfileMeta) => {
        this.numberOfMembers = data.followers;
      });
  }

  sendFollowInvite(i) {
    if (!i) {
      return of();
    }
    this.http.post(this.baseUrl + 'user/follow/user/' + i, '').subscribe((res: any) => {
      // console.log(res);
    }, error => {
      // console.log(error.error.errorMessage);
    });
  }

  unfollowUser(userId) {
    const ownerId = this.loginService.getUserProfile().id;
    this.userService.unfollowMe(ownerId, userId).subscribe((res: any) => {

    }, error => {

    });
  }

  openUserGroupDialog(type: UserListType): void {
    let config = null;
    const userListData: UserListData = new UserListData();
    userListData.community = this.community;
    userListData.type = type;
    if (this.mobileView) {
      config = {
        position: {
          top: '0',
          right: '0'
        },
        height: '100%',
        borderRadius: '0px',
        width: '100%',
        maxWidth: '100vw',
        marginTop: '0px',
        marginRight: '0px !important',
        panelClass: 'user-list-modal',
        overflow: 'hidden',
        data: userListData
      };
    } else {
      config = {
        maxWidth: '80vw',
        maxHeight: '70vh',
        panelClass: 'user-list-modal',
        overflow: 'hidden',
        // data: userList
        data: userListData
      };
    }
    const dialogRef = this.dialog.open(UserListComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      if (type === UserListType.requests) {
        if (this.isAllowedIntoCommunity) {
          this.getCommunityMembers();
        }
        this.getCommunityJoinRequests();
        this.pendingRequestCount.emit(this.pendingRequests);
      }
    });
  }

  checkImage(src) {
    if (src) {
      return src;
    } else {
      return StaticMediaSrc.userFile;
    }
  }

  navigate(slug) {
    window.open([GlobalConstants.userPath, slug].join('/'), '_blank');
  }

  getCommunityJoinRequests() {
    this.communityService.getCommunityJoinRequests(this.community.communityId, 0).subscribe((res: any) => {
      this.pendingJoinRequest = res;
      this.pendingRequests = res.numberOfElements;
    });
  }
}
