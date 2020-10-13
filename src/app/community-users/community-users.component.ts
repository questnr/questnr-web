import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SnackBarService } from 'common/snackbar.service';
import { ConfirmDialogModalComponent } from 'confirm-dialog-modal/confirm-dialog-modal.component';
import { GlobalService } from 'global.service';
import { Page } from 'models/page.model';
import { RelationType } from 'models/relation-type';
import { ActionType } from 'models/snackbar.model';
import { UserListData, UserListType, UserListViewSizeType } from 'models/user-list.model';
import { Subscription } from 'rxjs';
import { GlobalConstants } from 'shared/constants';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { environment } from '../../environments/environment';
import { LoginService } from '../auth/login.service';
import { CommunityService } from '../community/community.service';
import { Community, CommunityPrivacy, CommunityProfileMeta, CommunityUsersListViewType } from '../models/community.model';
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
  @Input() userListType: CommunityUsersListViewType;
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
  communityUsersListViewTypeClass = CommunityUsersListViewType;
  isOwner: boolean = false;
  @ViewChild("confirmDialogModalRef") confirmDialogModalRef: ConfirmDialogModalComponent;
  awaitConfirmDialogData;

  constructor(public http: HttpClient,
    public userService: UserProfileCardServiceComponent,
    public loginService: LoginService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public communityMembersService: CommunityMembersService,
    private loginAuth: LoginService,
    private _globalService: GlobalService,
    public communityService: CommunityService,
    private snackBarService: SnackBarService) {
    this.loggedInUserId = this.loginAuth.getLocalUserProfile().id;
  }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
    this.isAllowedIntoCommunity =
      this.communityService.isAllowedIntoCommunityWithRelationType(this.community.communityPrivacy, this.community.communityMeta.relationShipType);
    if (this.isAllowedIntoCommunity) {
      this.getCommunityMembers();
      // this.getCommunityMetaInfo(this.communitySlug);
    } else {
      this.restartCommunityMembersList();
      this.getCommunityMetaInfo();
    }
    this.isOwner = this.community.communityMeta.relationShipType === RelationType.OWNED;
    this.getCommunityJoinRequestsCount();
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
      this.isAllowedIntoCommunity =
        this.communityService.isAllowedIntoCommunityWithRelationType(this.community.communityPrivacy, this.community.communityMeta.relationShipType);
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
    this.communityService.getCommunityMetaInfoWithParams(this.community.slug, 'followers')
      .subscribe((data: CommunityProfileMeta) => {
        this.numberOfMembers = data.followers;
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
        this.getCommunityJoinRequestsCount();
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

  getCommunityJoinRequestsCount() {
    if (this.community.communityPrivacy == CommunityPrivacy.pri
      && this.isOwner)
      this.communityService.getCommunityMetaInfoWithParams(this.community.slug, 'totalRequests')
        .subscribe((data: CommunityProfileMeta) => {
          this.pendingRequests = data.totalRequests;
        });
    this.pendingRequestCount.emit(this.pendingRequests);
  }

  loaderItems() {
    if (this.communityMemberList.length > 5) {
      return Array(0);
    }
    return Array(5 - this.communityMemberList.length);
  }

  removeUserListener(processingUser: User) {
    this.awaitConfirmDialogData = processingUser;
    this.confirmDialogModalRef.open({
      title: `Do you want to remove ${processingUser.username}`,
      agreeText: "Remove",
      disagreeText: "Cancel"
    });
  }

  confirmDialogCloseActionListener(result) {
    if (result?.data) {
      this.communityMembersService
        .removeUserFromCommunity(this.community.communityId, this.awaitConfirmDialogData.userId).subscribe((communityMeta) => {
          this.communityMemberList = this.communityMemberList.filter((communityMember: User) => {
            return communityMember.userId !== this.awaitConfirmDialogData.userId
          });
          this.snackBarService.showSnackBar({
            message: `Removed ${this.awaitConfirmDialogData.username}`,
            actionType: ActionType.close
          });
          this.awaitConfirmDialogData = null;
        }, (error) => {
          if (error.error.errorMessage)
            this.snackBarService.showSnackBar({ message: error.error.errorMessage });
        });
    }
    else {
      this.awaitConfirmDialogData = null;
    }
  }
}
