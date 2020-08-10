import { Component, EventEmitter, Output, ElementRef, ViewChild, Renderer2, Input } from '@angular/core';
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
import { GlobalConstants } from 'shared/constants';
import { AuthService } from 'angularx-social-login';
import { CreateCommunityComponent } from '../../shared/components/dialogs/create-community/create-community.component';
import { MatDialog } from '@angular/material/dialog';
import { UsercommunityService } from '../../usercommunity/usercommunity.service';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { SearchOverlayComponent } from 'search/search-overlay/search-overlay.component';

@Component({
    selector: 'app-user-header',
    templateUrl: './user-header.component.html',
    styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent {
    @ViewChild('searchInputRef') searchInputRef: ElementRef;
    @ViewChild('suggestionBoxRef') suggestionBoxRef: ElementRef;
    @Input() mobileView: boolean = false;
    @Output() menuToggle = new EventEmitter();
    user: string;
    userDetail: User;
    userPath: string = GlobalConstants.userPath;
    explorePath: string = GlobalConstants.explorePath;
    isLoading = false;
    profile;
    endOfNotifications = false;
    searchInput = new FormControl();
    notifications: NotificationDTO[] = [];
    page = 0;
    hasNewNotifications: boolean = false;
    hasNewNotificationAnswers: boolean = false;
    notificationColor: string = 'black';
    notificationAnswerColor: string = 'black';
    feedPath: string = GlobalConstants.feedPath;
    termsPath: string = GlobalConstants.termsPath;
    policyPath: string = GlobalConstants.policyPath;
    unReadNotificationCount: number = 0;
    unReadNotificationAnswerCount: number = 0;
    isNotificationLoading: boolean = true;
    openedNotificationType: string;
    defaultUserSrc: string = StaticMediaSrc.userFile;
    @ViewChild("searchOverlayComponentRef") searchOverlayComponentRef: SearchOverlayComponent;

    constructor(private router: Router, public auth: LoginService,
        private authService: AuthService,
        private api: ApiService,
        private messagingService: MessagingService,
        private angularFireMessaging: AngularFireMessaging,
        private renderer: Renderer2,
        private dialog: MatDialog,
        private usercommunityService: UsercommunityService) {
    }

    ngOnInit() {
        this.profile = this.auth.getUserProfile();
        this.auth.getUserProfileImg();
        // Receive notification messages
        this.receiveMessage();
        this.getUserDetail();
        this.searchInput.valueChanges
            .subscribe((val) => {
                this.searchEntity(val);
            });
        // .pipe(
        //     debounceTime(500),
        //     tap(() => {
        //         this.hashtags = [];
        //     }),
        //     distinctUntilChanged(),
        // )

    }

    ngAfterViewInit() {
        this.searchInputRef.nativeElement.onfocus = () => {
            this.renderer.setStyle(this.suggestionBoxRef.nativeElement, 'display', 'block');
        };
        this.api.getUnreadNotificationCount().subscribe((count: number) => {
            this.unReadNotificationCount = count;
        });
        this.api.getUnreadNotificationAnswerCount().subscribe((count: number) => {
            this.unReadNotificationAnswerCount = count;
        });
    }

    closeSearchBox() {
        this.searchInput.setValue('');
        this.renderer.setStyle(this.suggestionBoxRef.nativeElement, 'display', 'none');
        this.handleBlur({});
    }

    toggleMenu() {
        this.menuToggle.emit();
    }

    handleFocus($event) {
        this.searchOverlayComponentRef.show();
    }

    handleBlur($event) {
        this.searchOverlayComponentRef.hide();
    }

    handleCloseSearchOverlay($event) {
        this.closeSearchBox();
    }

    searchEntity(value) {
        this.searchOverlayComponentRef.handleOpitonChanged(value);
    }

    getNotification() {
        this.api.getNotifications(this.page + 1).subscribe(
            (res: any) => {
                if (res && res.length > 0) {
                    this.readNotifications(res);
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
            (res: any) => {
                if (res.status === 200) {
                    const index = this.notifications.findIndex((i: NotificationDTO) => i.notificationId);
                    this.notifications.splice(index, 1);
                }
            }
        );
    }

    getNotificationAnswer() {
        this.api.getNotificationAnswers(this.page + 1).subscribe(
            (res: any) => {
                if (res && res.length > 0) {
                    this.readNotifications(res);
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

    loadMoreNotifications() {
        console.log('openedNotificationType', this.openedNotificationType);
        if (this.openedNotificationType === 'normal') {
            this.getNotification();
        } else if (this.openedNotificationType === 'question') {
            this.getNotificationAnswer();
        }
    }

    logOut() {
        localStorage.clear();
        this.authService.signOut();
        this.messagingService.deleteToken();
        this.router.navigate(['/']);
    }

    /**
     * hook method when new notification received in foreground
     */
    receiveMessage() {
        this.angularFireMessaging.onMessage((message) => {
            console.log('received a message:', message);
            if (typeof message !== 'undefined' && typeof message.data !== 'undefined') {
                let data = message.data;
                if (typeof data.isNotification !== 'undefined' && data.isNotification == 'true') {
                    if (data.type == 'normal') {
                        this.notificationColor = 'red';
                        this.hasNewNotifications = true;
                        this.unReadNotificationCount += 1;
                        setTimeout(() => {
                            this.hasNewNotifications = false;
                        }, 5000);
                    } else if (data.type == 'answer') {
                        this.notificationAnswerColor = 'red';
                        this.hasNewNotificationAnswers = true;
                        this.unReadNotificationAnswerCount += 1;
                        setTimeout(() => {
                            this.hasNewNotificationAnswers = false;
                        }, 5000);
                    }
                }
                // window.open(message.fcmOptions.link, "_blank");
                // @Todo: increament notification count and highlight it.
            }
        });
    }

    readNewNotification() {
        this.openedNotificationType = 'normal';
        this.notificationColor = 'black';
        this.unReadNotificationCount = 0;
        this.isNotificationLoading = true;
        this.endOfNotifications = false;
        this.api.getNotifications().subscribe(
            (res: NotificationDTO[]) => {
                this.notifications = res;
                this.readNotifications(res);
                this.isNotificationLoading = false;
            }
        );
    }

    readNewNotificationAnswer() {
        this.openedNotificationType = 'question';
        this.notificationAnswerColor = 'black';
        this.unReadNotificationAnswerCount = 0;
        this.isNotificationLoading = true;
        this.endOfNotifications = false;
        this.api.getNotificationAnswers().subscribe(
            (res: NotificationDTO[]) => {
                this.notifications = res;
                this.readNotifications(res);
                this.isNotificationLoading = false;
            }
        );
    }

    readNotifications(notificationList: NotificationDTO[]) {
        notificationList.forEach((notification: NotificationDTO) => {
            this.api.readNotification(notification.notificationId).subscribe();
        });
    }

    getUserDetail() {
        this.auth.getUserDetails(this.auth.getUserProfile().id).subscribe((res: any) => {
            this.userDetail = res;
            // console.log(this.userDetail);
        }, error => {
            // console.log(error.error.errorMessage)''
        });
    }

    createCommunity(): void {
        const dialogRef = this.dialog.open(CreateCommunityComponent, {
            maxWidth: this.mobileView ? "90vw" : "60vW",
            width: this.mobileView ? "90vw" : "60vW"
            // width: '800px',
            // data: { desc : event.target.innerText}
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }
}
