import { Component, OnInit } from '@angular/core';
import {UserProfileCardServiceComponent} from '../user-profile-card/user-profile-card-service.component';
import {UserProfilePageService} from './user-profile-page.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {
  feeds: any;
  url = (window.location.pathname).split('/')[2];
  constructor( public userProfilePageService: UserProfilePageService) { }

  ngOnInit(): void {
    this.getUserFeeds();
    this.getUserProfileDetails();
    this.getUserInfo();
  }
  getUserFeeds() {
    this.userProfilePageService.getUserFeeds().subscribe((res: any) => {
      console.log(res);
      this.feeds = res.content;
    }, error => {

    });
    }
  getUserProfileDetails() {
    this.userProfilePageService.getUserProfile(this.url).subscribe((res: any) => {

    }, error => {

    });
  }
  getUserInfo() {
    this.userProfilePageService.getUserInfo(this.url).subscribe((res: any) => {

    },error => {

    })
  }
}
