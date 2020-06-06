import { Component, Input, OnInit } from '@angular/core';
import { UserProfileCardServiceComponent } from './user-profile-card-service.component';
import { LoginService } from '../auth/login.service';
import { UserActivityService } from '../user-activity/user-activity.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from '../shared/constants';
@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.scss']
})
export class UserProfileCardComponent implements OnInit {
  @Input() avatar;
  @Input() username;
  @Input() slug: string;
  @Input() relationship;
  @Input() userId;
  followed: any;
  owner = false;
  noOfFollowers: number;
  userInfo: any;
  userPath = GlobalConstants.userPath;

  constructor(public auth: UserProfileCardServiceComponent, public loginAuth: LoginService, public route: ActivatedRoute,
    public userActivity: UserActivityService) { }

  ngOnInit(): void {
    if (this.relationship === 'owned') {
      this.owner = true;
    }
  }
  ngOnChanges() {
    this.getUserActivity();
  }
  addUser() {
    const res = this.auth.followMe(this.userId);
    this.auth.followMe(this.userId).subscribe((response: any) => {
      this.relationship = response.userMeta.relationShipType;
    }, error => {
      this.relationship = '';
      // console.log(error.error.errorMessage);
    });
  }
  unfollowUser(userId) {
    const ownerId = this.loginAuth.getUserProfile().id;
    // console.log(ownerId, userId);
    this.auth.unfollowMe(ownerId, userId).subscribe((res: any) => {
      // console.log('sucess');
      this.relationship = '';
    }, error => {
      // console.log(error.error.errorMessage);
    });
  }
  getUserActivity() {
    // console.log('user profile slug' , this.slug);
    this.userActivity.getUserInfo(this.slug).subscribe((res: any) => {
      this.userInfo = res;
    }, error => {
      // console.log(error.error.errorMessage);
    });
  }
}
