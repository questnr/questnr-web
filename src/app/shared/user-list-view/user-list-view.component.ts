import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserProfileCardServiceComponent} from '../../user-profile-card/user-profile-card-service.component';
import {LoginService} from '../../auth/login.service';

@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.scss']
})
export class UserListViewComponent implements OnInit {
  @Input() user: User;
  relation: any;
  constructor(public userProfileCardServiceComponent: UserProfileCardServiceComponent, public loginService: LoginService) { }

  ngOnInit(): void {
    this.relation = this.user?.userMeta?.relationShipType;
    console.log(this.relation);
  }

  unFollow(userId) {
    const ownerId = this.loginService.getUserProfile().id;
    this.userProfileCardServiceComponent.unfollowMe(ownerId, userId).subscribe((res: any) => {
      this.relation = 'none';
    }, error => {
      console.log(error.error.errorMessage);
    });
  }

  follow(userId) {
    this.userProfileCardServiceComponent.followMe(userId).subscribe((res: any) => {
      this.relation = 'followed';
    }, error => {
      console.log(error.error.errorMessage);
    });
  }
}
