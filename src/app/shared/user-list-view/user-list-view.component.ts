import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../auth/login.service';
import { CommunityService } from '../../community/community.service';
import { ConfirmDialogComponent } from '../../confirm-dialog-modal/confirm-dialog/confirm-dialog.component';
import { GlobalService } from '../../global.service';
import { CommunityRequestActionType } from '../../models/community.model';
import { RelationType } from '../../models/relation-type';
import { UserListViewSizeType, UserListViewVariables } from '../../models/user-list.model';
import { User } from '../../models/user.model';
import { GlobalConstants } from '../../shared/constants';
import { UserProfileCardServiceComponent } from '../../user-profile-card/user-profile-card-service.component';
import { InviteUsetService } from './invite-user.service';

@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.scss']
})
export class UserListViewComponent implements OnInit {
  @Input() user: User;
  @Input() userListRibbon;
  @Input() isInviteList: boolean = false;
  @Input() isCommunityRequest: boolean = false;
  @Input() otherUserId;
  @Input() communityId;
  @Input() size: UserListViewSizeType = UserListViewSizeType.large;
  @Output() specialActionEvent = new EventEmitter();
  @Output() clickActionEvent = new EventEmitter();
  userPath: string = GlobalConstants.userPath;
  relation: RelationType;
  mobileView: boolean = false;
  isInvited: boolean = false;
  isResponded = false;
  requestType: CommunityRequestActionType;
  userListViewVariables: any;
  communityRequestActionTypeClass = CommunityRequestActionType;
  isSpecialActionActive: boolean = false;
  hideSpecialActionTimeOut;
  @Input() isSpecialActionsAllowed: boolean = false;
  toolTipText: string;

  constructor(public userProfileCardServiceComponent: UserProfileCardServiceComponent,
    public loginService: LoginService,
    private dialog: MatDialog,
    private inviteUserService: InviteUsetService,
    public auth: CommunityService,
    private snackBar: MatSnackBar,
    private _globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.relation = this.user?.userMeta?.relationShipType;
    this.mobileView = this._globalService.isMobileView();
    if (this.size === UserListViewSizeType.small) {
      this.userListViewVariables = UserListViewVariables.small;
    } else {
      this.userListViewVariables = UserListViewVariables.large;
    }
    if (this.isSpecialActionsAllowed) {
      this.toolTipText = `Remove ${this.user.username}`;
    }
  }

  unfollow() {
    let title = "Do you want to unfollow " + this.user.username + "?";
    let dialogConfig;
    if (this.mobileView) {
      dialogConfig = {
        maxWidth: '95vw',
        width: '100%',
        data: {
          title,
          mobileView: this.mobileView
        }
      }
    } else {
      dialogConfig = {
        width: '550px',
        maxWidth: '80vw',
        data: {
          title,
          mobileView: this.mobileView
        }
      }
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result?.data == true) {
        const ownerId = this.loginService.getLocalUserProfile().id;
        this.userProfileCardServiceComponent.unfollowMe(ownerId, this.user.userId).subscribe((res: any) => {
          this.relation = RelationType.NONE;
        }, error => {
          // console.log(error.error.errorMessage);
        });
      }
    });
  }

  follow() {
    this.userProfileCardServiceComponent.followMe(this.user.userId).subscribe((res: any) => {
      this.relation = RelationType.FOLLOWED;
    }, error => {
      // console.log(error.error.errorMessage);
    });
  }

  invite() {
    if (this.isInviteList) {
      this.inviteUserService.inviteUser(this.communityId, this.otherUserId).subscribe((res: any) => {
        this.snackBar.open('Invitation has been sent!', 'close', { duration: 3000 });
      }, (err) => {
        if (err?.error?.errorMessage) {
          this.snackBar.open(err.error.errorMessage, 'close', { duration: 3000 });
        }
      });
      this.isInvited = true;
    }
  }

  joinRequestResponse(requestType: CommunityRequestActionType) {
    this.auth.joinRequestResponse(this.communityId, this.user.userId, requestType).subscribe((res: any) => {
      this.isResponded = true;
      this.requestType = requestType;
    });
  }

  showSpecialAction() {
    this.isSpecialActionActive = true;
    clearTimeout(this.hideSpecialActionTimeOut);
  }

  hideSpecialAction() {
    if (this.isSpecialActionActive) {
      clearTimeout(this.hideSpecialActionTimeOut);
      this.hideSpecialActionTimeOut = setTimeout(() => {
        this.isSpecialActionActive = false;
      }, 2000);
    }
  }

  emitSpecialAction($event) {
    this.specialActionEvent.emit(this.user);
  }

  clickAction() {
    this.clickActionEvent.emit();
  }

  onSwipeLeft() {
    if (!this.mobileView) return;
    this.showSpecialAction();
    this.hideSpecialAction();
  }
}
