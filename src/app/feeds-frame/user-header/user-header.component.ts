import { Component, EventEmitter, Output, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'auth/login.service';
import { ApiService } from 'shared/api.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap, map } from 'rxjs/operators';
import { MessagingService } from '../../service/messaging.service';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { HashTag } from 'models/hashtag.model';
import { User } from 'models/user.model';
import { Community } from 'models/community.model';
import { Page } from 'models/page.model';
import { NotificationDTO } from 'models/notification.model';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent {
  @ViewChild("searchInputRef") searchInputRef: ElementRef;
  @ViewChild("suggestionBoxRef") suggestionBoxRef: ElementRef;
  @Output() menuToggle = new EventEmitter();
  user: string;
  isLoading = false;
  profile;
  endOfNotifications = false;
  searchInput = new FormControl();
  hashtags: HashTag[] = [];
  users: User[] = [];
  communities: Community[] = [];
  notifications: NotificationDTO[] = [];
  page = 0;
  hasNewNotifications: boolean = false;
  notificationColor: string = 'black';
  filterSearchOptionList: string[] = ["users", 'communities', 'hashtags'];
  selectedSearchOption: number = 0;

  constructor(private router: Router, public auth: LoginService,
    private api: ApiService,
    private messagingService: MessagingService,
    private angularFireMessaging: AngularFireMessaging,
    private renderer: Renderer2) {
    this.profile = this.auth.getUserProfile();
    this.auth.getUserProfileImg();
    this.searchInput.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.hashtags = [];
        }),
        distinctUntilChanged(),
      )
      .subscribe((val) => {
        if (val) {
          this.searchEntity();
        }
      });
    this.api.getNotifications().subscribe(
      (res: NotificationDTO[]) => {
        this.notifications = res;
      }
    );
  }
  ngOnInit() {
    // Receive notification messages
    this.receiveMessage();
  }

  ngAfterViewInit() {
    this.searchInputRef.nativeElement.onfocus = () => {
      this.renderer.setStyle(this.suggestionBoxRef.nativeElement, "display", "block");
    }
  }

  closeSearchBox() {
    this.renderer.setStyle(this.suggestionBoxRef.nativeElement, "display", "none");
  }

  toggleMenu() {
    this.menuToggle.emit();
  }

  searchEntity() {
    if (!this.searchInput.value || this.searchInput.value == "") return;
    this.isLoading = true;
    if (this.selectedSearchOption === 0) {
      this.searchUsers();
    } else if (this.selectedSearchOption === 1) {
      this.searchCommunities();
    }
    else if (this.selectedSearchOption === 2) {
      this.searchHashtags();
    }
  }

  selectSearchOption(indexOfelement: number) {
    if (this.selectedSearchOption != indexOfelement) {
      this.selectedSearchOption = indexOfelement;
      this.searchEntity();
    }
  }

  searchHashtags() {
    this.api.searchHashtags(this.searchInput.value).subscribe(
      (res: HashTag[]) => {
        this.isLoading = false;
        this.hashtags = res;
      }
    );
  }
  searchUsers() {
    this.api.searchUsers(this.searchInput.value).subscribe(
      (res: Page<User>) => {
        this.isLoading = false;
        this.users = res.content;
        // console.log("users", res);
      }
    );
  }
  searchCommunities() {
    this.api.searchCommunities(this.searchInput.value).subscribe(
      (res: Page<Community>) => {
        this.isLoading = false;
        this.communities = res.content;
        // console.log("communities", res);
      }
    );
  }
  handleRouterLink(slug: string) {
    let path: string = "user";
    if (this.selectedSearchOption == 1)
      path = "community";
    else if (this.selectedSearchOption == 2)
      path = "hash-tag";
    this.router.navigate(["/", path, slug]);
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
          const index = this.notifications.findIndex((i: NotificationDTO) => i.notificationId);
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
      // console.log("received a message:", message);
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
