import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
// import { TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'questnr-front-end';

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'hn']);
    translate.setDefaultLang('hr');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|hn/) ? browserLang : 'hr');
  }

  test() {
    alert('parent');
  }
}
