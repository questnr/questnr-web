import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'common/common.service';
import { CommunityActivityComponent } from 'community-activity/community-activity.component';
import { CommunityActivityService } from 'community-activity/community-activity.service';
import { CommunityUsersComponent } from 'community-users/community-users.component';
import { ConfirmDialogComponent } from 'confirm-dialog/confirm-dialog.component';
import { GlobalService } from 'global.service';
import { ImgCropperWrapperComponent } from 'img-cropper-wrapper/img-cropper-wrapper.component';
import { ConfirmDialogContentType } from 'models/confirm-dialog.model';
import { NotificationPurposeType, NotificationType, PushNotificationDTO } from 'models/notification.model';
import { Page } from 'models/page.model';
import { RelationType } from 'models/relation-type';
import { TrackingEntityType, TrackingInstance } from 'models/user-activity.model';
import { UserListData, UserListType } from 'models/user-list.model';
import { Subject, Subscription } from 'rxjs';
import { SharePostComponent } from 'shared/components/dialogs/share-post/share-post.component';
import { UserListComponent } from 'shared/components/dialogs/user-list/user-list.component';
import { GlobalConstants } from 'shared/constants';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { PostNotificationContainerComponent } from 'shared/post-notification-container/post-notification-container.component';
import { QuestnrActivityService } from 'shared/questnr-activity.service';
import { UIService } from 'ui/ui.service';
import { UserQuestionListComponent } from 'user-question-list/user-question-list.component';
import { LoginService } from '../auth/login.service';
import { Community, CommunityPrivacy, CommunityProfileMeta } from '../models/community.model';
import { Post, QuestionParentType } from '../models/post-action.model';
import { User } from '../models/user.model';
import { DescriptionComponent } from '../shared/components/dialogs/description/description.component';
import { CommunityHorizontalCardComponent } from './community-horizontal-card/community-horizontal-card.component';
import { CommunityService } from './community.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  @ViewChild('feedPartRef') feedPartRef: ElementRef;
  communityUsersComponentRef: CommunityUsersComponent;

  @ViewChild('communityUsersComponentRef') set content(content: CommunityUsersComponent) {
    if (content) { // initially setter gets called with undefined
      this.communityUsersComponentRef = content;
    }
  }

  @ViewChild('imageCropperRef') imageCropperRef: ImgCropperWrapperComponent;
  isSidenavopen = false;
  communitySlug: string;
  communityDTO: Community;
  description: string;
  owner: RelationType;
  comUserList: any[];
  ownerDTO: User;
  comUpdatedAvatar: any;
  communityImage: string = StaticMediaSrc.communityFile;
  loggedInUserId: any;
  page: number = 0;
  endOfPosts = false;
  userFeeds: Post[] = [];
  loading: boolean = true;
  communityId: number;
  mobileView: boolean = false;
  scrollCached: boolean = null;
  owned: string = RelationType.OWNED;
  followed: string = RelationType.FOLLOWED;
  none: string = RelationType.NONE;
  // To show user post header instead of community post header
  showUserHeader: boolean = true;
  trackerInstance: TrackingInstance;
  communityFeedRef: ElementRef;
  @ViewChild('communityFeed')
  set communityFeed(communityFeedRef: ElementRef) {
    this.communityFeedRef = communityFeedRef;
  }
  pendingRequests: number;
  isCommunityPrivate = false;
  explorePath = GlobalConstants.explorePath;
  relationType = RelationType;
  isAllowedIntoCommunity: boolean;
  fetchCommunityFeedsSubscriber: Subscription;
  userListTypeClass = UserListType;
  questionParentTypeClass = QuestionParentType;
  communityPostNotificationRef: PostNotificationContainerComponent;
  @ViewChild("communityPostNotification")
  set communityPostNotification(communityPostNotificationRef: PostNotificationContainerComponent) {
    this.communityPostNotificationRef = communityPostNotificationRef;
    this.communityPostNotificationRef?.setCommunity(this.communityDTO);
  }
  communitySubject = new Subject<Community>();
  communityInfo: CommunityProfileMeta;
  questionListRef: UserQuestionListComponent;
  @ViewChild("questionList")
  set questionList(questionListRef: UserQuestionListComponent) {
    this.questionListRef = questionListRef;
  }
  communityActivityRef: CommunityActivityComponent;
  @ViewChild("communityActivity")
  set communityActivity(communityActivityRef: CommunityActivityComponent) {
    this.communityActivityRef = communityActivityRef;
  }
  // --- Start of Community side sections references ---
  communityImageBottomRef: ElementRef;
  @ViewChild("communityImageBottom")
  set communityImageBottom(communityImageBottomRef: ElementRef) {
    this.communityImageBottomRef = communityImageBottomRef;
  }
  leftSectionRef: ElementRef;
  @ViewChild("leftSection")
  set leftSection(leftSectionRef: ElementRef) {
    this.leftSectionRef = leftSectionRef;
  }
  rightSectionRef: ElementRef;
  @ViewChild("rightSection")
  set rightSection(rightSectionRef: ElementRef) {
    this.rightSectionRef = rightSectionRef;
  }
  leftSectionBodyRef: ElementRef;
  @ViewChild("leftSectionBody")
  set leftSectionBody(leftSectionBodyRef: ElementRef) {
    this.leftSectionBodyRef = leftSectionBodyRef;
  }
  @ViewChild("leftSectionFooter")
  set leftSectionFooter(leftSectionFooterRef: ElementRef) {
    if (leftSectionFooterRef) {
      this.communitySideSections.footerHeight = leftSectionFooterRef.nativeElement.getBoundingClientRect().height;
    }
  }
  // --- End of Community side sections references ---
  communitySideSections: any = {
    initialHeight: 0,
    hasAddedMakeFixedToLeftPart: false,
    footerHeight: 0,
    renderered: false,
    safeScrollTop: 100
  }
  communityHorizontalCardRef: CommunityHorizontalCardComponent;
  @ViewChild("communityHorizontalCard")
  set communityHorizontalCard(communityHorizontalCardRef: CommunityHorizontalCardComponent) {
    this.communityHorizontalCardRef = communityHorizontalCardRef;
  }

  constructor(public communityService: CommunityService,
    public fb: FormBuilder,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public loginAuth: LoginService,
    private uiService: UIService,
    private router: Router,
    public commonService: CommonService,
    private _activityService: QuestnrActivityService,
    private _globalService: GlobalService,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef,
    private communityActivityService: CommunityActivityService) {
    this.loggedInUserId = loginAuth.getLocalUserProfile().id;
    this.mobileView = this._globalService.isMobileView();

    // set community in communityPostNotificationRef when community subject changes
    this.communitySubject.subscribe((community: Community) => {
      this.communityPostNotificationRef?.setCommunity(community);
    });
  }

  public trackItem(index: number, feed: Post) {
    return feed.slug;
  }

  ngOnInit() {
    this.mobileView = this._globalService.isMobileView();
    this.communitySlug = this.route.snapshot.paramMap.get('communitySlug');
    this.route.data.subscribe((data: { community: Community }) => {
      this.communitySubject.next(data.community);
      this.communityDTO = data.community;
      this.communityId = this.communityDTO.communityId;
      this.owner = this.communityDTO.communityMeta.relationShipType;
      this.restartCommunityFeeds(true);
      this.description = data.community.description;
      if (data.community.communityPrivacy === CommunityPrivacy.pri) {
        this.isCommunityPrivate = true;
      }
      if (this.communityDTO?.avatarDTO?.avatarLink) {
        this.communityImage = this.communityDTO.avatarDTO.avatarLink;
      }
      this.ownerDTO = this.communityDTO.ownerUserDTO;
      this.getCommunityInfo();
      this._activityService.start(this.communityDTO.communityId, TrackingEntityType.community)
        .then((trackerInstance: TrackingInstance) => {
          this.trackerInstance = trackerInstance;
        });
    });
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngAfterViewInit() {
    this.communityFeedRef.nativeElement.addEventListener('scroll', this.onScroll, true);
    this.renderer.setStyle(document.getElementsByTagName('body')[0], 'overflow', 'hidden');
    this.questionListRef?.setCommunityData(this.communityDTO);
    this.communitySideSections.leftPartInitialHeight = this.communityImageBottomRef.nativeElement.getBoundingClientRect().top;
    // console.log("this.communityImageBottomRef", this.communityImageBottomRef.nativeElement.getBoundingClientRect());
    this.communityHorizontalCardRef?.setCommunity(this.communityDTO);
  }

  ngOnDestroy() {
    if (this.fetchCommunityFeedsSubscriber) {
      this.fetchCommunityFeedsSubscriber.unsubscribe();
    }
    this.communityFeedRef.nativeElement.removeEventListener('scroll', this.onScroll, true);
    this.renderer.removeStyle(document.getElementsByTagName('body')[0], 'overflow');
    this.uiService.resetTitle();
    if (this.trackerInstance)
      this.trackerInstance.destroy();
  }

  onScroll = (event): void => {
    if (!this.mobileView) {
      // Only available for deskop
      this.communitySideSectionsInView(event);
    }
    if (!this.scrollCached) {
      setTimeout(() => {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 300) {
          // console.log('no im  here');
          if (this.userFeeds.length >= 1 && !this.endOfPosts) {
            // console.log('check network call', this.endOfPosts);
            if (!this.loading) {
              this.fetchCommunityFeeds();
            }
          }
        }
        this.scrollCached = null;
      }, 100);
    }
    this.scrollCached = event;
  }

  restartCommunityFeeds(callFromConstructor: boolean = false) {
    // this.ngOnInit();
    // this.getCommunityDetailsById();
    this.isAllowedIntoCommunity = this.communityService.isAllowedIntoCommunity(this.communityDTO);

    // No need to re-fetch feeds again if the community is not private.
    if (!callFromConstructor && this.communityDTO.communityPrivacy == CommunityPrivacy.pub) return;

    this.userFeeds = [];
    this.page = 0;

    this.communityPostNotificationRef?.reset();

    // If already feed is being fetched, stop the thread
    if (this.fetchCommunityFeedsSubscriber) {
      this.fetchCommunityFeedsSubscriber.unsubscribe();
    }

    this.fetchCommunityFeeds();
  }

  getCommunityDetailsById() {
    this.communityService.getCommunityDetailsById(this.communityId).subscribe((community: Community) => {
      this.isAllowedIntoCommunity = this.communityService.isAllowedIntoCommunity(community);
    });
  }

  openCommunityDesc(): void {
    // console.log();
    const dialogRef = this.dialog.open(DescriptionComponent, {
      width: '500px',
      // height: '300px',
      data: {
        text: this.description,
        communityAvatar: this.communityImage,
        owner: this.owner,
        communityId: this.communityDTO.communityId,
        descriptionEmit: this.descriptionEmit
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  descriptionEmit = (desc: string) => {
    this.description = desc;
  }

  postFeed(event) {
    if (typeof event === 'object' && event?.length > 0) {
      // console.log("event", event);
      this.communityPostNotificationRef.setLastPostId(event[0].postActionId);
      this.userFeeds = [...event, ...this.userFeeds];
      this.cd.detectChanges();
    } else if (event.postActionId) {
      this.communityPostNotificationRef.setLastPostId(event.postActionId);
      this.userFeeds = [event, ...this.userFeeds];
    } else {
      this.userFeeds = [];
      this.page = 0;
      this.fetchCommunityFeeds();
    }
  }

  fetchCommunityFeeds() {
    if (this.isAllowedIntoCommunity) {
      // console.log("fetchCommunityFeeds");
      this.loading = true;
      this.fetchCommunityFeedsSubscriber = this.communityService.getCommunityFeeds(this.communityId, this.page).subscribe((res: Page<Post>) => {
        // console.log("Posts", res);
        if (res.content.length) {
          this.loading = false;
          this.page++;
          res.content.forEach(post => {
            this.userFeeds.push(post);
          });
          if (this.page - 1 === 0) {
            this.communityPostNotificationRef.setLastPostId(this.userFeeds[0].postActionId);
          }
        } else {
          this.endOfPosts = true;
          this.loading = false;
        }
      }, error => {
        // console.log(error.error.errorMessage);
        this.loading = false;
      });
    }
  }

  changeCommunityAvatar() {
    if (this.comUpdatedAvatar) {
      const formData = new FormData();
      formData.set('file', this.comUpdatedAvatar, this.comUpdatedAvatar.name);
      this.communityService.updateCommunityAvatar(formData, this.communityDTO.communityId).subscribe((res: any) => {
      }, error => {
      });
    }
  }

  previewImage() {
    // const src = document.getElementById('communityImageSrc').click();
    this.imageCropperRef.openImageCropper();
  }

  imageDataReceiver(file) {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.communityImage = reader.result as string;
        this.comUpdatedAvatar = file;
        this.changeCommunityAvatar();
      };
    }
  }

  navigate(slug) {
    window.open([GlobalConstants.userPath, slug].join('/'), '_blank');
  }

  // onFileChange(event) {
  //   const reader = new FileReader();
  //   if (event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     reader.readAsDataURL(file);

  //     reader.onload = () => {
  //       this.communityImage = reader.result as string;
  //       if (event.target.files.length > 0) {
  //         this.comUpdatedAvatar = event.target.files[0];
  //         this.changeCommunityAvatar();
  //       }
  //     };
  //   }
  // }

  copyLinkOfCommunity($event) {
    this.snackBar.open('Link copied to clipboard', 'close', { duration: 5000 });
    // let snackBarRef = this.snackbar.open('Copying Link..');
    // this.commonService.copyToClipboard(this.commonService.getCommunitySharableLink(this.communitySlug));
    // snackBarRef.dismiss();
    // this.communityService.getSharableLink(this.communityId).subscribe((res: any) => {
    //   this.commonService.copyToClipboard(res.clickAction);
    //   snackBarRef.dismiss();
    // });
  }

  removePostNotify($event) {
    this.userFeeds = this.userFeeds.filter((userFeed: Post) =>
      userFeed.postActionId !== $event);
  }

  actionEvent($event: RelationType) {
    this.owner = $event;
    this.communityDTO.communityMeta.relationShipType = $event;
    // console.log("actionEvent", $event);
    this.communityUsersComponentRef.ngOnInit();
    this.restartCommunityFeeds();
  }

  getCommunityJoinRequests() {
    if (this.communityDTO.communityPrivacy == CommunityPrivacy.pri)
      this.communityService.getCommunityMetaInfoWithParams(this.communityDTO.slug, 'totalRequests')
        .subscribe((data: CommunityProfileMeta) => {
          this.pendingRequests = data.totalRequests;
        });
  }

  getCommunityInfo() {
    this.loading = true;
    this.communityActivityService.getCommunityMetaInfo(this.communitySlug).subscribe((res: CommunityProfileMeta) => {
      this.communityInfo = res;
      this.communityActivityRef.setCommunityInfo(this.communityInfo);
      this.questionListRef.setTotalCounts(this.communityInfo.totalQuestions);
      this.communityHorizontalCardRef?.setCommunityInfo(this.communityInfo);
      if (this.owner === RelationType.OWNED) {
        this.pendingRequests = this.communityInfo.totalRequests;
      }
    }, error => {
    });
  }

  openUserGroupDialog(type: UserListType): void {
    let config = null;
    let userListData: UserListData = new UserListData();
    userListData.community = this.communityDTO;
    userListData.type = type;
    if (this.mobileView) {
      config = {
        position: {
          top: '0',
          right: '0'
        },
        height: '100%',
        borderRadius: '0px',
        width: '100%',
        maxWidth: '100vw',
        marginTop: '0px',
        marginRight: '0px !important',
        panelClass: 'user-list-modal',
        overflow: "hidden",
        data: userListData
      };
    } else {
      config = {
        // width: '500px',
        // data: userList,
        maxHeight: '70vh',
        maxWidth: "80vw",
        panelClass: 'user-list-modal',
        overflow: "hidden",
        data: userListData
      };
    }
    const dialogRef = this.dialog.open(UserListComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      this.getCommunityJoinRequests();
    });
  }

  openShareDialog() {
    const clickAction = this.commonService.getCommunitySharableLink(this.communitySlug);
    this.dialog.open(SharePostComponent, {
      width: '500px',
      data: { url: clickAction }
    });
  }

  toggleCommunityPrivacy(updatedPrivacy: CommunityPrivacy) {
    this.communityService.toggleCommunityPrivacy(this.communityId, updatedPrivacy).subscribe((res: Community) => {
      if (res.communityPrivacy === CommunityPrivacy.pri) {
        this.isCommunityPrivate = true;
      }
      if (res.communityPrivacy === CommunityPrivacy.pub) {
        this.isCommunityPrivate = false;
        this.communityUsersComponentRef.ngOnInit();
      }
      this.snackBar.open('Community privacy updated', 'close', { duration: 3000 });
    }, error => {
      this.snackBar.open(error.error.errorMessage, 'close', { duration: 3000 });
    });
  }

  communityPrivacyDialog() {
    const title = (this.isCommunityPrivate) ? 'Make "' + this.communityDTO.communityName + '" Public?' : 'Make "' + this.communityDTO.communityName + '" Private?';
    const agreeText = 'Yes, I understand!';
    const disagreeText = 'Cancel';
    const confirmDialogContentType = this.isCommunityPrivate ? ConfirmDialogContentType.makePublicCommunity :
      ConfirmDialogContentType.makePrivateCommunity;
    let dialogConfig;
    if (this.mobileView) {
      dialogConfig = {
        maxWidth: '100vw',
        width: '100%',
        data: {
          title,
          mobileView: this.mobileView,
          confirmDialogContentType,
          agreeText,
          disagreeText
        }
      };
    } else {
      dialogConfig = {
        width: '550px',
        maxWidth: '80vw',
        data: {
          title,
          mobileView: this.mobileView,
          confirmDialogContentType,
          agreeText,
          disagreeText
        }
      };
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result?.data) {
        const privacy: CommunityPrivacy = (this.isCommunityPrivate) ? CommunityPrivacy.pub : CommunityPrivacy.pri;
        this.toggleCommunityPrivacy(privacy);
      }
    });
  }
  updatePendingRequestCount(pendingRequestCount) {
    this.pendingRequests = pendingRequestCount;
  }

  notificationListener(data: PushNotificationDTO) {
    if (data.type == NotificationType.normal
      && data.purposeType == NotificationPurposeType.postCreated) {
      // the same community
      if (this.communitySlug === data.communitySlug) {
        this.communityPostNotificationRef.receivedNewPostNotification(data.postId);
      }
    }
  }

  communitySideSectionsInView(event) {
    // console.log("this.communitySideSections", this.communitySideSections);
    var bounding = this.communityImageBottomRef.nativeElement.getBoundingClientRect();
    // console.log("bouding", bounding);
    // Sections / Community image are not in view
    if (bounding.top <= this.communitySideSections.initialHeight * 0.8 &&
      event.target.scrollTop > this.communitySideSections.safeScrollTop) {
      // console.log("Adding make-fixed");
      if (!this.communitySideSections.hasAddedMakeFixedToLeftPart) {
        this.communitySideSections.hasAddedMakeFixedToLeftPart = true;
        // console.log("Added make-fixed");
        this.renderer.setStyle(this.leftSectionRef.nativeElement, "max-width",
          this.leftSectionBodyRef.nativeElement.getBoundingClientRect().width + "px");
        if (!this.communitySideSections.renderered) {
          // One time set up
          this.communitySideSections.renderered = true;
        }
        this.renderer.addClass(this.leftSectionRef.nativeElement, "make-fixed");
        this.renderer.addClass(this.leftSectionRef.nativeElement, "left");
        this.renderer.addClass(this.rightSectionRef.nativeElement, "make-fixed");
        this.renderer.addClass(this.rightSectionRef.nativeElement, "right");
        if (this.communitySideSections.footerHeight) {
          // console.log("Setting margin-bottom ", this.communitySideSections.footerHeight)
          this.renderer.setStyle(this.leftSectionBodyRef.nativeElement, "padding-bottom",
            this.communitySideSections.footerHeight + "px");
        }
      }
    } else {
      // console.log("Removing make-fixed");
      if (this.communitySideSections.hasAddedMakeFixedToLeftPart) {
        // console.log("Removed make-fixed");
        this.communitySideSections.hasAddedMakeFixedToLeftPart = false;
        this.renderer.removeClass(this.leftSectionRef.nativeElement, "make-fixed");
        this.renderer.removeClass(this.leftSectionRef.nativeElement, "left");
        this.renderer.removeClass(this.rightSectionRef.nativeElement, "make-fixed");
        this.renderer.removeClass(this.rightSectionRef.nativeElement, "right");
        this.renderer.removeStyle(this.leftSectionBodyRef.nativeElement, "padding-bottom");
      }
    }
  }
}
