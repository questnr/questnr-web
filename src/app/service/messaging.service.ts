import { ApiService } from '../shared/api.service';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo, mergeMap } from 'rxjs/operators';

@Injectable()
export class MessagingService {
  constructor(private angularFireMessaging: AngularFireMessaging,
    private apiService: ApiService) {
    this.angularFireMessaging.messages.subscribe(
      (_messaging: AngularFireMessaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }

  requestPermission() {
    this.angularFireMessaging.requestToken
      .pipe(mergeMapTo(this.angularFireMessaging.tokenChanges))
      .subscribe(
        (token) => {
          // console.log(token);
          // console.log("saving token");
          this.apiService.registerPushNotificationToken(token).subscribe();
        },
        (err) => {
          console.error('Unable to get permission to notify.', err);
        }
      );
  }

  deleteToken() {
    this.angularFireMessaging.getToken
      .pipe(mergeMap(token => this.angularFireMessaging.deleteToken(token)))
      .subscribe(
        (token) => { console.log('Token deleted!'); },
      );
  }
} 
