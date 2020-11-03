import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginResponse } from 'models/login.model';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { GlobalConstants } from './shared/constants';
declare var window: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isBrowser: boolean;
  routerSubscription: Subscription;
  GTAG_ID = GlobalConstants.gtagId;
  mobileView = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    // this.translate.addLangs(['en', 'hn']);
    // this.translate.setDefaultLang('hr');
    // const browserLang = this.translate.getBrowserLang();
    // if(browserLang)
    // this.translate.use(browserLang.match(/en|hn/) ? browserLang : 'hr');
  }
  ngOnInit() {
    this.routerSubscription = this.router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          document.body.scrollTop = 0;
        }
      });

    window.nsWebViewInterface.on('LOAD_DATA', (data) => {
      environment.setData(data.environment);
    });

    window.nsWebViewInterface.on('LOGIN_WITN_TOKEN', (loginResponse) => {
      console.log("LOGIN_WITN_TOKEN");
      console.log(loginResponse);
      this.loginThread(loginResponse);
    });
  }
  ngAfterViewInit() {
  }
  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
  loginThread(res: LoginResponse) {
    localStorage.setItem('token', res.accessToken);
    this.router.navigate(["/", GlobalConstants.feedPath],
      { state: { communitySuggestion: res.communitySuggestion ? true : false } });
  }
}
