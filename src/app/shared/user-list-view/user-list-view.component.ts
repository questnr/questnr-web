import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserProfileCardServiceComponent } from '../../user-profile-card/user-profile-card-service.component';
import { LoginService } from '../../auth/login.service';
import { GlobalConstants } from 'shared/constants';

@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.scss']
})
export class UserListViewComponent implements OnInit {
  @Input() user: User;
  @Input() userListRibbon;
  userPath: string = GlobalConstants.userPath;
  relation: any;
  screenWidth = window.innerWidth;
  mobileView = false;

  constructor(public userProfileCardServiceComponent: UserProfileCardServiceComponent, public loginService: LoginService) { }

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
      this.relation = 'none';
    }, error => {
      console.log(error.error.errorMessage);
    });
  }

  follow() {
    this.userProfileCardServiceComponent.followMe(this.user.userId).subscribe((res: any) => {
      this.relation = 'followed';
    }, error => {
      console.log(error.error.errorMessage);
    });
  }
}
