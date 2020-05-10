import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {UserFollowersService} from './user-followers.service';
import {LoginService} from '../auth/login.service';
import {UserProfileCardServiceComponent} from '../user-profile-card/user-profile-card-service.component';
import {User} from '../models/user.model';

@Component({
  selector: 'app-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrls: ['./user-followers.component.scss']
})
export class UserFollowersComponent implements OnInit {
  @Input() userId: number;
  followers: User[];
  following: User[];
  constructor(public followersService: UserFollowersService, public loginService: LoginService,
              public userProfileCardServiceComponent: UserProfileCardServiceComponent) {
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.getFollowingUser();
      this.getFollowedBy();
    }, 2000);
  }
  getFollowingUser() {
    // console.log('test userId', this.profileId);
    this.followersService.getUserFollowers(this.userId).subscribe((res: any) => {
      console.log('follower content' + res.content);
      this.followers = res.content;
    }, error => {
      console.log(error.error.errorMessage);
    });
  }

  getFollowedBy() {
    this.followersService.getFollowedBy(this.userId).subscribe((res: any) => {
      console.log('followed content' + res.content);
      this.following = res.content;
    }, error => {
      console.log(error.error.errorMessage);
    });
  }

  unFollow(userId) {
    const ownerId = this.loginService.getUserProfile().id;
    this.userProfileCardServiceComponent.unfollowMe(ownerId, userId).subscribe((res: any) => {
      console.log('Unfollowed');
    }, error => {
      console.log(error.error.errorMessage);
    });
  }
  follow(userId) {
    this.userProfileCardServiceComponent.followMe(userId).subscribe((res: any) => {
      console.log('Unfollowed');
    }, error => {
      console.log(error.error.errorMessage);
    });
  }
}
