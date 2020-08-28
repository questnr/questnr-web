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
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RelationType } from 'models/relation-type';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { GlobalConstants } from 'shared/constants';
import { CommunityService } from '../community/community.service';
import { GlobalService } from 'global.service';
import { Page } from 'models/page.model';

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
  isAllowedIntoCommunity: boolean;
  communityMemberList: User[] = [];
  loader: boolean = false;
  mobileView: boolean = false;
  numberOfMembers: number;
  loggedInUserId;
  owned: string = RelationType.OWNED;
  followed: string = RelationType.FOLLOWED;
  none: string = RelationType.NONE;
  pendingJoinRequest: any;
  pendingRequests = 0;

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
    this.isAllowedIntoCommunity = this.communityService.isAllowedIntoCommunityWithRelationType(this.relationshipType);
    if (this.isAllowedIntoCommunity) {
      this.getCommunityMembers(this.communitySlug);
      // this.getCommunityMetaInfo(this.communitySlug);
    } else {
      this.getCommunityMetaInfo(this.communitySlug);
    }
    if (this.relationshipType === RelationType.OWNED) {
      this.getCommunityJoinRequests(this.communityId);
    }
  }

  ngAfterViewInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log("changes", changes);
    if ((changes.communitySlug || changes.relationshipType)) {
      if (changes?.communitySlug?.currentValue) {
        this.communitySlug = changes.communitySlug.currentValue;
      }
      if (changes?.relationshipType?.currentValue) {
        this.relationshipType = changes.relationshipType.currentValue;
      }
      this.isAllowedIntoCommunity = this.communityService.isAllowedIntoCommunityWithRelationType(this.relationshipType);
      if (this.isAllowedIntoCommunity)
        this.getCommunityMembers(this.communitySlug);
    }
  }

  getCommunityMembers(communitySlug: string) {
    this.loader = true;
    this.communityMembersService.getCommunityMembers(communitySlug, 0).subscribe((data: Page<User>) => {
      this.loader = false;
      this.communityMemberList = data.content;
      this.numberOfMembers = data.totalElements;
      // console.log("getCommunityMembers", data);
    }, error => {
      // console.log('something went wrong while fetching community Members.');
      this.loader = false;
    });
  }

  getCommunityMetaInfo(communitySlug: string) {
    this.communityMembersService.getCommunityMetaInfoWithParams(communitySlug, "followers")
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
        data: { communitySlug: this.communitySlug, type, communityPendingRequests: this.pendingJoinRequest, communityId: this.communityId, title: type }
      };
    } else {
      config = {
        // width: '500px',
        maxWidth: "80vw",
        maxHeight: '60vh',
        overflow: "hidden",
        // data: userList
        data: { communitySlug: this.communitySlug, type, communityPendingRequests: this.pendingJoinRequest, communityId: this.communityId, title: type }
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
    this.communityService.getCommunityJoinRequests(communityId, 0).subscribe((res: any) => {
      this.pendingJoinRequest = res;
      this.pendingRequests = res.numberOfElements;
    });
  }
}
