import {Component, Input, OnInit} from '@angular/core';
import {UserProfileCardServiceComponent} from './user-profile-card-service.component';
import {LoginService} from '../auth/login.service';
@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.scss']
})
export class UserProfileCardComponent implements OnInit {
  @Input() avatarLink = 'assets/default.jpg';
  @Input() username;
  @Input() slug;
  @Input() relationship;
  @Input() userId;
  followed: any;
  owner = false;
  noOfFollowers: number;
  // @Input() followers;
  constructor( public auth: UserProfileCardServiceComponent, public loginAuth: LoginService) { }

  ngOnInit(): void {
    if (this.avatarLink == null) {
      this.avatarLink = 'assets/default.jpg';
    }
    if (this.relationship === 'owned') {
      this.owner = true;
    }
    this.getUserFollowers();
  }

  addUser() {
    const res = this.auth.followMe(this.userId);
    this.auth.followMe(this.userId).subscribe((response: any) => {
      this.relationship = response.userMeta.relationShipType ;
    }, error => {
      this.relationship = '';
      console.log(error.error.errorMessage);
    });
  }
  unfollowUser(userId) {
    const ownerId =  this.loginAuth.getUserProfile().id;
    console.log(ownerId, userId);
    this.auth.unfollowMe(ownerId, userId).subscribe((res: any) => {
      console.log('sucess');
      this.relationship = '';
    }, error => {
      console.log(error.error.errorMessage);
    });
  }
  getUserFollowers() {
    this.auth.fetchUserFollowing().subscribe((res: any) => {
      console.log(res.content.size, res.content.length);
      this.noOfFollowers = res?.content.length;
    }, error => {
      console.log(error.error.errorMessage);
    })
  }
}
