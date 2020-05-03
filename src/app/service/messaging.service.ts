import { ApiService } from '../shared/api.service';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class MessagingService {
  baseUrl = environment.baseUrl;
  currentMessage = new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging, private apiService: ApiService) {
    this.angularFireMessaging.messages.subscribe(
      (_messaging: AngularFireMessaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        // console.log(token);
        // console.log("saving token");
        this.apiService.registerPushNotificationToken(token).subscribe();
      },
      (err) => {
        // console.error('Unable to get permission to notify.', err);
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        // console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      })
  }
}
