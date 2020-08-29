import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserProfileCardServiceComponent } from '../user-profile-card/user-profile-card-service.component';
import { LoginService } from '../auth/login.service';
import { ActivatedRoute } from '@angular/router';
import { UserListComponent } from '../shared/components/dialogs/user-list/user-list.component';
import { MatDialog } from '@angular/material/dialog';
import { CommunityMembersService } from './community-members.service';
import { Community, CommunityProfileMeta } from '../models/community.model';
import { User, UserListViewSizeType } from '../models/user.model';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RelationType } from 'models/relation-type';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { GlobalConstants } from 'shared/constants';
import { CommunityService } from '../community/community.service';
import { GlobalService } from 'global.service';

@Component({
  selector: 'app-community-users',
  templateUrl: './community-users.component.html',
  styleUrls: ['./community-users.component.scss']
})
export class CommunityUsersComponent implements OnInit {
  baseUrl = environment.baseUrl;
  @Input() communitySlug: string;
  @Input() userListType;
  @Input() ownerUser: User;
  @Input() communityId;
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
    this.getCommunityMembers(this.communitySlug);
    this.getCommunityMetaInfo(this.communitySlug);
  }

  ngAfterViewInit() {
    this.mobileView = this._globalService.isMobileView();
    if (this.relationshipType === RelationType.OWNED) {
      this.getCommunityJoinRequests(this.communityId);
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

  openUserGroupDialog(type): void {
    let config = null;
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
        panelClass: 'full-screen-modal',
        data: { communitySlug: this.communitySlug, type, communityPendingRequests: this.pendingJoinRequest, communityId: this.communityId }
      };
    } else {
      config = {
        // width: '500px',
        maxWidth: "80vw",
        maxHeight: '60vh',
        overflow: "hidden",
        // data: userList
        data: { communitySlug: this.communitySlug, type, communityPendingRequests: this.pendingJoinRequest, communityId: this.communityId }
      };
    }
    const dialogRef = this.dialog.open(UserListComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      this.getCommunityMembers(this.communitySlug);
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
