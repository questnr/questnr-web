import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'global.service';
import { RelationType } from 'models/relation-type';
import { UserListViewSizeType, UserListData, UserListType } from 'models/user-list.model';
import { of } from 'rxjs';
import { GlobalConstants } from 'shared/constants';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { environment } from '../../environments/environment';
import { LoginService } from '../auth/login.service';
import { CommunityService } from '../community/community.service';
import { CommunityProfileMeta, Community } from '../models/community.model';
import { User } from '../models/user.model';
import { UserListComponent } from '../shared/components/dialogs/user-list/user-list.component';
import { UserProfileCardServiceComponent } from '../user-profile-card/user-profile-card-service.component';
import { CommunityMembersService } from './community-members.service';

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
  communityMemberList: User[] = [];
  loader = false;
  mobileView = false;
  screenWidth = window.innerWidth;
  numberOfMembers: string;
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
    public auth: CommunityService,
    private _globalService: GlobalService) {
    this.loggedInUserId = this.loginAuth.getUserProfile().id;
  }

  ngOnInit(): void {
    this.getCommunityMembers(this.community.slug);
    this.getCommunityMetaInfo(this.community.slug);
  }

  ngAfterViewInit() {
    this.mobileView = this._globalService.isMobileView();
    if (this.relationshipType === RelationType.OWNED) {
      this.getCommunityJoinRequests(this.community.communityId);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.communitySlug) {
      this.getCommunityMembers(changes.communitySlug.currentValue);
    }
  }

  getCommunityMembers(communitySlug: string) {
    this.loader = true;
    this.communityMembersService.getCommunityMembers(communitySlug, 0).subscribe((data: any) => {
      this.loader = false;
      this.communityMemberList = data.content;
      // console.log(this.communityMemberList);
    }, error => {
      // console.log('something went wrong while fetching community Members.');
      this.loader = false;
    });
  }

  getCommunityMetaInfo(communitySlug: string) {
    this.communityMembersService.getCommunityMetaInfoWithParams(communitySlug, "followers").subscribe((data: CommunityProfileMeta) => {
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
    let userListData: UserListData = new UserListData();
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
        overflow: "hidden",
        data: userListData
      };
    } else {
      config = {
        // width: '500px',
        maxWidth: "80vw",
        maxHeight: '70vh',
        panelClass: 'user-list-modal',
        overflow: "hidden",
        // data: userList
        data: userListData
      };
    }
    const dialogRef = this.dialog.open(UserListComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      if (type == UserListType.requests)
        this.getCommunityMembers(this.community.slug);
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

  getCommunityJoinRequests(communityId) {
    this.auth.getCommunityJoinRequests(communityId, 0).subscribe((res: any) => {
      this.pendingJoinRequest = res;
      this.pendingRequests = res.numberOfElements;
    });
  }
}
