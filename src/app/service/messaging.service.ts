import { ApiService } from '../shared/api.service';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo, mergeMap } from 'rxjs/operators';

@Injectable()
export class MessagingService {
  currentToken: string;
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
          this.currentToken = token;
          this.apiService.registerPushNotificationToken(token).subscribe();
        },
        (err) => {
          // console.error('Unable to get permission to notify.', err);
        }
      );
    // this.angularFireMessaging.onTokenRefresh(() => {
    //   this.angularFireMessaging.getToken.subscribe((refreshedToken) => {
    //     console.log('Token refreshed.');
    //     // Send Instance ID token to app server.
    //     this.apiService.refreshPushNotificationToken(this.currentToken, refreshedToken).subscribe(() => {
    //       this.currentToken = refreshedToken;
    //     });
    //   }, (err) => {
    //     // console.log('Unable to retrieve refreshed token ', err);
    //   });
    // })
  }

  deleteToken() {
    this.angularFireMessaging.getToken
      .pipe(mergeMap((token) => {
        // console.log("token", token);
        // this.apiService.deletePushNotificationToken(token).subscribe((res) => {
        //   console.log(res);
        // }, (err) => {
        //   console.log(err);
        // });
        return this.angularFireMessaging.deleteToken(token);
      }))
      .subscribe(
        (token) => {
          console.log('Token deleted!', token);
        },
      );
  }
} 
