import { Component, OnInit } from '@angular/core';
import {UserFollowersService} from './user-followers.service';

@Component({
  selector: 'app-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrls: ['./user-followers.component.scss']
})
export class UserFollowersComponent implements OnInit {

  constructor(public followersService: UserFollowersService) { }
  followers: any;
  following: any;
  ngOnInit(): void {
    // this.getFollowingUser();
    // this.getFollowedBy();
  }
  getFollowingUser(userId) {
    this.followersService.getUserFollowers(userId).subscribe((res: any) => {
      console.log('follower content' + res.content);
      this.followers = res.content;
    }, error => {
      console.log(error.error.errorMessage);
    });
  }
  getFollowedBy(userId) {
    this.followersService.getFollowedBy(userId).subscribe((res: any) => {
      console.log('followed content' + res.content);
      this.following = res.content;
    }, error => {
      console.log(error.error.errorMessage);
    });
  }
}
