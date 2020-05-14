import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'auth/login.service';
import { ApiService } from 'shared/api.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap, map } from 'rxjs/operators';
import { MessagingService } from '../../service/messaging.service';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent {

  @Output() menuToggle = new EventEmitter();
  user: string;
  isLoading = false;
  profile;
  endOfNotifications = false;
  hashtagInput = new FormControl();
  hashtags = [];
  notifications = [];
  page = 0;
  hasNewNotifications: boolean = false;
  notificationColor: string = 'black';

  constructor(private router: Router, public auth: LoginService,
    private api: ApiService,
    private messagingService: MessagingService,
    private angularFireMessaging: AngularFireMessaging) {
    this.profile = this.auth.getUserProfile();
    this.auth.getUserProfileImg();
    this.hashtagInput.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.hashtags = [];
        }),
        distinctUntilChanged(),
      )
      .subscribe((val) => {
        if (val) {
          this.isLoading = true;
          this.searchHashtag();
        }
      });
    this.api.getNotifications().subscribe(
      (res: any) => {
        this.notifications = res;
      }
    );
  }
  ngOnInit() {
    // Receive notification messages
    this.receiveMessage();
  }

  toggleMenu() {
    this.menuToggle.emit();
  }
  searchHashtag() {
    this.api.searchHashtag(this.hashtagInput.value).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.hashtags = res;
      }
    );
  }
  getNotification() {
    this.api.getNotifications(this.page + 1).subscribe(
      (res: any) => {
        if (res.length) {
          res.forEach(element => {
            ++this.page;
            this.notifications.push(element);
          });
        } else {
          this.endOfNotifications = true;
        }
      }
    );
  }
  removeNotification(id) {
    this.api.removeNotification(id).subscribe(
      res => {
        if (res.status === 200) {
          const index = this.notifications.findIndex(i => i.notificationId);
          this.notifications.splice(index, 1);
        }
      }
    );
  }
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/');
    this.messagingService.deleteToken();
  }

  /**
  * hook method when new notification received in foreground
  */
  receiveMessage() {
    this.angularFireMessaging.onMessage((message) => {
      console.log("received a message:", message);
      if (typeof message !== 'undefined' && typeof message.data !== 'undefined') {
        let data = message.data;
        if (typeof data.isNotification !== 'undefined' && data.isNotification == "true") {
          if (data.type == "normal") {
            this.notificationColor = "red";
            this.hasNewNotifications = true;
            setTimeout(() => {
              this.hasNewNotifications = false;
            }, 5000);
          }
        }
        // window.open(message.fcmOptions.link, "_blank");
        // @Todo: increament notification count and highlight it.
      }
    });
  }

  readNewNotification() {
    this.notificationColor = "black";
  }
}
