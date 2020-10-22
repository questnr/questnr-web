import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LoginService } from '../../auth/login.service';
import { GlobalService } from '../../global.service';
import { AvatarDTO } from '../../models/common.model';
import { NotificationDTO, NotificationType, PushNotificationDTO } from '../../models/notification.model';
import { User } from '../../models/user.model';
import { SearchOverlayComponent } from '../../search/search-overlay/search-overlay.component';
import { ApiService } from '../../shared/api.service';
import { CreateCommunityComponent } from '../../shared/components/dialogs/create-community/create-community.component';
import { GlobalConstants } from '../../shared/constants';
import { StaticMediaSrc } from '../../shared/constants/static-media-src';
import { ProfileIconComponent } from '../../shared/profile-icon/profile-icon.component';

@Component({
    selector: 'app-user-header',
    templateUrl: './user-header.component.html',
    styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent {
    @ViewChild('searchInputRef') searchInputRef: ElementRef;
    @ViewChild('suggestionBoxRef') suggestionBoxRef: ElementRef;
    mobileView: boolean = false;
    @Output() menuToggle = new EventEmitter();
    @Output() notificationEmitter = new EventEmitter();
    user: string;
    userDetails: User;
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
    avatar: AvatarDTO;
    profileIconRef: ProfileIconComponent;
    @ViewChild("profileIcon")
    set profileIcon(profileIconRef: ProfileIconComponent) {
        this.profileIconRef = profileIconRef;
    }

    constructor(public login: LoginService,
        private api: ApiService,
        private angularFireMessaging: AngularFireMessaging,
        private renderer: Renderer2,
        private dialog: MatDialog,
        private _globalService: GlobalService,
        private cd: ChangeDetectorRef) {
        this.login.avatarSubject.subscribe((avatar: AvatarDTO) => {
            // console.log("USERHEADER FEEDS SUBJECT", avatar);
            this.avatar = avatar;
            this.profileIconRef?.setAvatar(avatar);
        });
    }

    ngOnInit() {
        this.mobileView = this._globalService.isMobileView();
        this.profile = this.login.getLocalUserProfile();
        // Receive notification messages
        this.receiveMessage();
        this.getLoggedInUserDetails();
        this.searchInput.valueChanges
            .pipe(debounceTime(200))
            .pipe(distinctUntilChanged())
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
        this.searchOverlayComponentRef.show(this.searchInput.value);
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
        // console.log('openedNotificationType', this.openedNotificationType);
        if (this.openedNotificationType === 'normal') {
            this.getNotification();
        } else if (this.openedNotificationType === 'question') {
            this.getNotificationAnswer();
        }
    }

    /**
     * hook method when new notification received in foreground
     */
    receiveMessage() {
        this.angularFireMessaging.onMessage((message) => {
            // console.log('received a message:', message);
            if (typeof message !== 'undefined' && typeof message.data !== 'undefined') {
                let data: PushNotificationDTO = message.data;
                if (typeof data.isNotification !== 'undefined' && data.isNotification == "true") {
                    if (data.type == NotificationType.normal) {
                        this.notificationColor = 'red';
                        this.hasNewNotifications = true;
                        this.unReadNotificationCount += 1;
                        setTimeout(() => {
                            this.hasNewNotifications = false;
                        }, 5000);
                        this.cd.detectChanges();
                    } else if (data.type == NotificationType.answer) {
                        this.notificationAnswerColor = 'red';
                        this.hasNewNotificationAnswers = true;
                        this.unReadNotificationAnswerCount += 1;
                        setTimeout(() => {
                            this.hasNewNotificationAnswers = false;
                        }, 5000);
                        this.cd.detectChanges();
                    }
                }
                this.notificationEmitter.emit(data);
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

    readNotifications(notificationList: NotificationDTO[] = []) {
        notificationList.forEach((notification: NotificationDTO) => {
            this.api.readNotification(notification.notificationId).subscribe();
        });
    }

    getLoggedInUserDetails() {
        this.login.getLoggedInUserDetails().subscribe((res: User) => {
            this.userDetails = res;
            this.profileIconRef?.setAvatar(this.userDetails.avatarDTO);
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
