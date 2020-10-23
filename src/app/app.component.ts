import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalService } from './global.service';
import { GlobalConstants } from './shared/constants';
// import { TranslateService } from '@ngx-translate/core';
declare var gtag;

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
  screenWidth = window.innerWidth;

  constructor(@Inject(PLATFORM_ID) platformId: Object,
    private router: Router,
    private _globalService: GlobalService
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
        if (this.isBrowser) {
          if (event instanceof NavigationEnd) {
            document.body.scrollTop = 0;
            gtag('config', this.GTAG_ID, {
              page_path: event.urlAfterRedirects
            });
          }
        }
      });
  }
  ngAfterViewInit() {
    if (this.isBrowser) {
      const width = this.screenWidth;
      if (width <= 900) {
        this.mobileView = true;
      } else if (width >= 1368) {
        this.mobileView = false;
      } else if (width >= 900 && width <= 1368) {
        this.mobileView = false;
      }
      this._globalService.setMobileView(this.mobileView);
    }
//     <!-- Global site tag (gtag.js) - Google Analytics -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=UA-168117128-1"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag() { dataLayer.push(arguments); }
//   gtag('js', new Date());
// </script>
  }
  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
  test() {
    alert('parent');
  }
}
