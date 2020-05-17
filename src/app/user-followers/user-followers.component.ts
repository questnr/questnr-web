import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {UserFollowersService} from './user-followers.service';
import {LoginService} from '../auth/login.service';
import {UserProfileCardServiceComponent} from '../user-profile-card/user-profile-card-service.component';
import {User} from '../models/user.model';
import {CreateCommunityComponent} from '../shared/components/dialogs/create.community/create-community.component';
import {MatDialog} from '@angular/material/dialog';
import {UserListComponent} from '../shared/components/dialogs/user-list/user-list.component';

@Component({
  selector: 'app-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrls: ['./user-followers.component.scss']
})
export class UserFollowersComponent implements OnInit {
  @Input() userId: number;
  followers: User[];
  following: User[];
  mobileView =false ;
  screenWidth = window.innerWidth;

  constructor(public followersService: UserFollowersService, public loginService: LoginService,
              public userProfileCardServiceComponent: UserProfileCardServiceComponent, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getFollowingUser();
      this.getFollowedBy();
    }, 2000);
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

  getFollowingUser() {
    // console.log('test userId', this.profileId);
    this.followersService.getUserFollowers(this.userId).subscribe((res: any) => {
      // console.log('follower content' + res.content);
      this.followers = res.content;
    }, error => {
      console.log(error.error.errorMessage);
    });
  }

  getFollowedBy() {
    this.followersService.getFollowedBy(this.userId).subscribe((res: any) => {
      // console.log('followed content' + res.content);
      this.following = res.content;
    }, error => {
      console.log(error.error.errorMessage);
    });
  }

  unFollow(userId) {
    const ownerId = this.loginService.getUserProfile().id;
    this.userProfileCardServiceComponent.unfollowMe(ownerId, userId).subscribe((res: any) => {
      // console.log('Unfollowed');
    }, error => {
      console.log(error.error.errorMessage);
    });
  }

  follow(userId) {
    this.userProfileCardServiceComponent.followMe(userId).subscribe((res: any) => {
      // console.log('Unfollowed');
    }, error => {
      console.log(error.error.errorMessage);
    });
  }

  openUserGroupDialog(userList): void {
    const dialogRef = this.dialog.open(UserListComponent, {
      width: '500px',
      data: userList
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


}
