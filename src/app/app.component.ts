import { Component, OnInit, Inject } from '@angular/core';
// @ts-ignore
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
// import { TranslateService } from '@ngx-translate/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isBrowser: boolean;
  routerSubscription: Subscription;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private router: Router) {
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
        if (event instanceof NavigationEnd)
          document.body.scrollTop = 0;
      });
  }
  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
  test() {
    alert('parent');
  }
}
