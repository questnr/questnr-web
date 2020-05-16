import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserActivityService} from './user-activity.service';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent implements OnInit {
  url: string;
  userInfo: any;
  mobileView = false;
  screenWidth = window.innerWidth;
  constructor(public route: ActivatedRoute, public userActivityService: UserActivityService) { }

  ngOnInit(): void {
    this.url = this.route.snapshot.paramMap.get('userSlug');
    this.getUserInfo();
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
  }
  getUserInfo() {
    console.log('entered');
    this.userActivityService.getUserInfo(this.url).subscribe((res: any) => {
      this.userInfo = res;
      console.log(res);
    }, error => {
      console.log(error.error.errorMessage);
    })
  }

}
