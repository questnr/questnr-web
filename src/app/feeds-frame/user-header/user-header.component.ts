import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'auth/login.service';
import { ApiService } from 'shared/api.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap, map } from 'rxjs/operators';
import { MessagingService } from '../../service/messaging.service';

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

  constructor(private router: Router, public auth: LoginService, private api: ApiService, private messagingService: MessagingService) {
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
}
