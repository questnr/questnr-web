import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserProfileCardServiceComponent } from '../../user-profile-card/user-profile-card-service.component';
import { LoginService } from '../../auth/login.service';
import { GlobalConstants } from 'shared/constants';
import { InviteUsetService } from './invite-user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RelationType } from 'models/relation-type';

@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.scss']
})
export class UserListViewComponent implements OnInit {
  @Input() user: User;
  @Input() userListRibbon;
  @Input() isInviteList: boolean = false;
  @Input() otherUserId;
  @Input() communityId;
  userPath: string = GlobalConstants.userPath;
  relation: RelationType;
  screenWidth = window.innerWidth;
  mobileView = false;
  isInvited: boolean = false;

  constructor(public userProfileCardServiceComponent: UserProfileCardServiceComponent, public loginService: LoginService,
    private inviteUserService: InviteUsetService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.relation = this.user?.userMeta?.relationShipType;
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
      const el = document.querySelector('.flex-7');
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
  }

  unfollow() {
    const ownerId = this.loginService.getUserProfile().id;
    this.userProfileCardServiceComponent.unfollowMe(ownerId, this.user.userId).subscribe((res: any) => {
      this.relation = RelationType.NONE;
    }, error => {
      // console.log(error.error.errorMessage);
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
        this.snackBar.open("Invitation has been sent!", 'close', { duration: 3000 });
      }, (err) => {
        if (err?.error?.errorMessage) {
          this.snackBar.open(err.error.errorMessage, 'close', { duration: 3000 });
        }
      });
      this.isInvited = true;
    }
  }
}
