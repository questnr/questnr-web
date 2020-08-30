import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'confirm-dialog/confirm-dialog.component';
import { GlobalService } from 'global.service';
import { RelationType } from 'models/relation-type';
import { GlobalConstants } from 'shared/constants';
import { LoginService } from '../../auth/login.service';
import { CommunityService } from '../../community/community.service';
import { User } from '../../models/user.model';
import { UserProfileCardServiceComponent } from '../../user-profile-card/user-profile-card-service.component';
import { InviteUsetService } from './invite-user.service';
import { UserListViewSizeType, UserListViewVariables } from 'models/user-list.model';

@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.scss']
})
export class UserListViewComponent implements OnInit {
  @Input() user: User;
  @Input() userListRibbon;
  @Input() isInviteList: boolean = false;
  @Input() isCommunityRequest = false;
  @Input() otherUserId;
  @Input() communityId;
  @Input() size: UserListViewSizeType = UserListViewSizeType.large;
  userPath: string = GlobalConstants.userPath;
  relation: RelationType;
  screenWidth = window.innerWidth;
  mobileView = false;
  isInvited: boolean = false;
  isResponded = false;
  response: any;
  userListViewVariables: any;

  constructor(public userProfileCardServiceComponent: UserProfileCardServiceComponent,
    public loginService: LoginService,
    private dialog: MatDialog,
    private inviteUserService: InviteUsetService,
    public auth: CommunityService,
    private snackBar: MatSnackBar,
    private _globalService: GlobalService,
    private renderer2: Renderer2) {
    // this.renderer2.
  }

  ngOnInit(): void {
    this.relation = this.user?.userMeta?.relationShipType;
    this.mobileView = this._globalService.isMobileView();
    if (this.size === UserListViewSizeType.small) {
      this.userListViewVariables = UserListViewVariables.small;
    } else {
      this.userListViewVariables = UserListViewVariables.large;
    }
  }

  unfollow() {
    let title = "Do you want to unfollow " + this.user.username + "?";
    let dialogConfig;
    if (this.mobileView) {
      dialogConfig = {
        maxWidth: '100vw',
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
        const ownerId = this.loginService.getUserProfile().id;
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

  joinRequestResponse(userId, response) {
    this.auth.joinRequestResponse(this.communityId, userId, response).subscribe((res: any) => {
      this.isResponded = true;
      this.response = response;
    });
  }
}
