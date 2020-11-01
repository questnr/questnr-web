import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GlobalService } from 'global.service';
import { Subscription } from 'rxjs';
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
  }
  ngAfterViewInit() {
  }
  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
  test() {
    alert('parent');
  }
}
