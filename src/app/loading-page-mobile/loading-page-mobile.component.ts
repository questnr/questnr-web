import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from 'models/login.model';
import { GlobalConstants } from 'shared/constants';
declare var window: any;

@Component({
  selector: 'app-loading-page-mobile',
  templateUrl: './loading-page-mobile.component.html',
  styleUrls: ['./loading-page-mobile.component.scss']
})
export class LoadingPageMobileComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    window.nsWebViewInterface.on('LOGIN_WITN_TOKEN', (loginResponse) => {
      console.log("LOGIN_WITN_TOKEN");
      console.log(loginResponse);
      this.loginThread(loginResponse);
    });
  }

  loginThread(res: LoginResponse) {
    localStorage.setItem('token', res.accessToken);
    this.router.navigate(["/", GlobalConstants.feedPath],
      { state: { communitySuggestion: res.communitySuggestion ? true : false } });
  }
}
