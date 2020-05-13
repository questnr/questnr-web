import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { TranslateService } from '@ngx-translate/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'hn']);
    translate.setDefaultLang('hr');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|hn/) ? browserLang : 'hr');
  }
  ngOnInit() {

  }
  test() {
    alert('parent');
  }
}
