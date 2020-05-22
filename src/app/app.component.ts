import { Component, OnInit, Inject } from '@angular/core';
// @ts-ignore
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isBrowser: boolean;

  constructor( @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  // constructor() {
  //    translate.addLangs(['en', 'hn']);
  //   translate.setDefaultLang('hr');
  //   const browserLang = translate.getBrowserLang();
  //    translate.use(browserLang.match(/en|hn/) ? browserLang : 'hr');
  // }
  ngOnInit() {

  }
  test() {
    alert('parent');
  }
}
