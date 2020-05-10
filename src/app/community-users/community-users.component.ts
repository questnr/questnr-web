import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {UserProfileCardServiceComponent} from '../user-profile-card/user-profile-card-service.component';
import {LoginService} from '../auth/login.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-community-users',
  templateUrl: './community-users.component.html',
  styleUrls: ['./community-users.component.scss']
})
export class CommunityUsersComponent implements OnInit {
  baseUrl = environment.baseUrl;
  url: string;
  communityMemberList = [];
  loader = false;

  constructor(public http: HttpClient, public userService: UserProfileCardServiceComponent, public loginService: LoginService, public route: ActivatedRoute ) {
  }

  ngOnInit(): void {
    this.url = this.route.snapshot.paramMap.get('communitySlug');
    this.getCommunityMembers();

  }

  getCommunityMembers() {
    this.loader = true;
    this.http.get(this.baseUrl + 'user/community/' + this.url + '/users').subscribe((data: any) => {
      this.loader = false;
      data.content.map((value, index) => {
        this.communityMemberList.push(value);
      });
      // console.log(this.communityMemberList);
    }, error => {
      // console.log('something went wrong while fetching community Members.');
      this.loader = false;
    });
  }

  sendFollowInvite(i) {
    this.http.post(this.baseUrl + 'user/follow/user/' + i  , '').subscribe((res: any) => {
      console.log(res);
    }, error => {
      console.log(error.error.errorMessage);
    });
  }
  unfollowUser(userId) {
    const ownerId = this.loginService.getUserProfile().id;
    this.userService.unfollowMe(ownerId, userId).subscribe((res: any) => {

    }, error => {

    });
  }
}
