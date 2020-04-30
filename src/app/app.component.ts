import { Component } from '@angular/core';
// @ts-ignore
import {TranslateService} from '@ngx-translate/core';

import { MessagingService } from './service/messaging.service';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'questnr-front-end';
  message;

  constructor(public translate: TranslateService, private messagingService: MessagingService) {
    translate.addLangs(['en', 'hn']);
    translate.setDefaultLang('hr');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|hn/) ? browserLang : 'hr');
  }
  ngOnInit() {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }

  test() {
    alert('parent');
  }
}
