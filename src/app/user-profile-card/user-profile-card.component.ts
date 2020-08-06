import { Component, Input, OnInit } from '@angular/core';
import { UserProfileCardServiceComponent } from './user-profile-card-service.component';
import { LoginService } from '../auth/login.service';
import { UserActivityService } from '../user-activity/user-activity.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from '../shared/constants';
import { RelationType } from 'models/relation-type';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.scss']
})
export class UserProfileCardComponent implements OnInit {
  @Input() userBannerImage;
  @Input() avatar;
  @Input() username;
  @Input() slug: string;
  @Input() relationship: RelationType;
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
    if (!this.userBannerImage) {
      this.userBannerImage = StaticMediaSrc.userBannerFile;
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
      this.relationship = RelationType.NONE;
      // console.log(error.error.errorMessage);
    });
  }
  unfollowUser(userId) {
    const ownerId = this.loginAuth.getUserProfile().id;
    // console.log(ownerId, userId);
    this.auth.unfollowMe(ownerId, userId).subscribe((res: any) => {
      // console.log('sucess');
      this.relationship = RelationType.NONE;
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
