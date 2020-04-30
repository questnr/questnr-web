import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-community-users',
  templateUrl: './community-users.component.html',
  styleUrls: ['./community-users.component.scss']
})
export class CommunityUsersComponent implements OnInit {
  baseUrl = environment.baseUrl;
  url = (window.location.pathname).split('/')[2];
  communityMemberList = [];

  constructor(public http: HttpClient) {
  }

  ngOnInit(): void {
    this.getCommunityMembers();
  }

  getCommunityMembers() {
    this.http.get(this.baseUrl + 'user/community/' + this.url + '/users').subscribe((data: any) => {
      data.content.map((value, index) => {
        this.communityMemberList.push(value);
      });
      console.log(this.communityMemberList);
    }, error => {
      console.log('something went wrong while fetching community Members.');
    });
  }

  sendFollowInvite(i, ev) {
    ev.target.innerText = 'Requested';
    // ev.target.offsetParent.style.background = '#ff6600';
    // ev.target.offsetParent.style.color = '#ffffff';
    this.http.post(this.baseUrl+ '/follow/user/' + i  , '').subscribe((res: any) => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }
}
