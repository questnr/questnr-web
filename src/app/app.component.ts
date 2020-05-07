import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { AngularFireMessaging } from '@angular/fire/messaging';
import { TranslateService } from '@ngx-translate/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public translate: TranslateService, private angularFireMessaging: AngularFireMessaging) {
    translate.addLangs(['en', 'hn']);
    translate.setDefaultLang('hr');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|hn/) ? browserLang : 'hr');
  }
  ngOnInit() {
    // Receive notification messages
    this.receiveMessage();
  }

  test() {
    alert('parent');
  }

  /**
  * hook method when new notification received in foreground
  */
  receiveMessage() {
    this.angularFireMessaging.onMessage((message) => {
      console.log("received a message:", message);
      if (typeof message !== 'undefined' && typeof message.fcmOptions !== 'undefined' && typeof message.fcmOptions.link !== 'undefined') {
        // window.open(message.fcmOptions.link, "_blank");
        // @Todo: increament notification count and highlight it.
      }
    });
  }
}
