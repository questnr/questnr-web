import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'global.service';
import { ImgCropperWrapperComponent } from 'img-cropper-wrapper/img-cropper-wrapper.component';
import { JoinedCommunityComponent } from 'joined-community/joined-community.component';
import { CommunityListMatCardType } from 'models/community-list.model';
import { RelationType } from 'models/relation-type';
import { TrackingEntityType, TrackingInstance } from 'models/user-activity.model';
import { Subject } from 'rxjs';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { QuestnrActivityService } from 'shared/questnr-activity.service';
import { UIService } from 'ui/ui.service';
import { UserActivityService } from 'user-activity/user-activity.service';
import { UserQuestionListComponent } from 'user-question-list/user-question-list.component';
import { UsercommunityComponent } from 'usercommunity/usercommunity.component';
import { LoginService } from '../auth/login.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Post, QuestionParentType } from '../models/post-action.model';
import { User, UserInfo } from '../models/user.model';
import { ApiService } from '../shared/api.service';
import { UserProfileCardServiceComponent } from '../user-profile-card/user-profile-card-service.component';
import { UserProfilePageService } from './user-profile-page.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent implements OnInit {
  @ViewChild('imageCropperRef') imageCropperRef: ImgCropperWrapperComponent;
  feeds: Post[];
  url: string;
  user: User;
  userObserver: Subject<User> = new Subject();
  userAvatarImage = StaticMediaSrc.userFile;
  userBannerImage = StaticMediaSrc.userBannerFile;
  isBannerLoding: boolean = true;
  comUpdatedAvatar: any;
  stats: any;
  relation: RelationType;
  loading: boolean = true;
  page: number = 0;
  endOfPosts = false;
  userFeeds = [];
  userId: any;
  mobileView: boolean = false;
  scrollCached: boolean = null;
  @ViewChild("userBannerImageCropperRef") userBannerImageCropperRef: ImgCropperWrapperComponent;
  userInfo: UserInfo;
  defaultUserSrc: string = StaticMediaSrc.userFile;
  trackerInstance: TrackingInstance;
  @ViewChild("feedProfile") feedProfile: ElementRef;
  showBanner: boolean = false;
  showAvatar: boolean = false;
  @ViewChild("userBannerImgRef") userBannerImgRef: ElementRef;
  @ViewChild("userAvatarImgRef") userAvatarImgRef: ElementRef;
  questionParentTypeClass = QuestionParentType;
  CommunityListMatCardTypeClass = CommunityListMatCardType;
  // User Owned Community List Component
  userCommunityBoxRef: UsercommunityComponent;
  @ViewChild("userCommunityBox")
  set userCommunityBox(userCommunityBoxRef: UsercommunityComponent) {
    this.userCommunityBoxRef = userCommunityBoxRef;
  }

  // User Joined Community List Component
  joinedCommunityBoxRef: JoinedCommunityComponent;
  @ViewChild("joinedCommunityBox")
  set joinedCommunityBox(joinedCommunityBoxRef: JoinedCommunityComponent) {
    this.joinedCommunityBoxRef = joinedCommunityBoxRef;
  }

  // User Question List
  userQuestionListRef: UserQuestionListComponent;
  @ViewChild("userQuestionList")
  set userQuestionList(userQuestionListRef: UserQuestionListComponent) {
    this.userQuestionListRef = userQuestionListRef;
  }
  // ---- Start of User Profile Left part references ----
  userProfileLeftPartRef: ElementRef;
  @ViewChild("userProfileLeftPart")
  set userProfileLeftPart(userProfileLeftPartRef: ElementRef) {
    this.userProfileLeftPartRef = userProfileLeftPartRef;
  }
  userProfileLeftPartContainerRef: ElementRef;
  @ViewChild("userProfileLeftPartContainer")
  set userProfileLeftPartContainer(userProfileLeftPartContainerRef: ElementRef) {
    this.userProfileLeftPartContainerRef = userProfileLeftPartContainerRef;
  }
  userProfileLeftPartBodyRef: ElementRef;
  @ViewChild("userProfileLeftPartBody")
  set userProfileLeftPartBody(userProfileLeftPartBodyRef: ElementRef) {
    this.userProfileLeftPartBodyRef = userProfileLeftPartBodyRef;
  }
  @ViewChild("userProfileLeftPartFooter")
  set userProfileLeftPartFooter(userProfileLeftPartFooterRef: ElementRef) {
    if (userProfileLeftPartFooterRef) {
      this.leftPartSection.footerHeight = userProfileLeftPartFooterRef.nativeElement.getBoundingClientRect().height;
    }
  }
  // ---- End of User Profile Left part references ---
  leftPartSection: any = {
    leftPartInitialHeight: 0,
    hasAddedMakeFixedToLeftPart: false,
    footerHeight: 0
  }


  constructor(public userProfilePageService: UserProfilePageService,
    public route: ActivatedRoute,
    public userFollowersService: UserProfileCardServiceComponent,
    public loginService: LoginService,
    public api: ApiService,
    private meta: Meta,
    private uiService: UIService,
    private router: Router,
    private userActivityService: UserActivityService,
    public dialog: MatDialog,
    private _activityService: QuestnrActivityService,
    private renderer: Renderer2,
    private _globalService: GlobalService,) {
    this.userObserver.subscribe((user: User) => {
      if (user.firstName || user.lastName) {
        this.uiService.setTitle((user.firstName + " " + user.lastName).trim() + " | Questnr");
      } else {
        this.uiService.setTitle(user.username + " | Questnr");
      }
    });
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    this.url = this.route.snapshot.paramMap.get('userSlug');
    this.getUserProfileDetails();
    this.getUserInfo();
    this.getCommunityFollowedByUser();
    this.mobileView = this._globalService.isMobileView();
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.userBannerImgRef.nativeElement, "min-height", this.mobileView ? "140px" : "270px");
    this.renderer.setStyle(this.userAvatarImgRef.nativeElement, "min-height", this.mobileView ? "110px" : "200px");
    this.renderer.setStyle(this.userAvatarImgRef.nativeElement, "min-width", this.mobileView ? "110px" : "200px");
    this.feedProfile.nativeElement.addEventListener('scroll', this.onScroll, true);
    this.renderer.setStyle(document.getElementsByTagName("body")[0], "overflow", "hidden");
    this.leftPartSection.leftPartInitialHeight = this.userProfileLeftPartContainerRef.nativeElement.getBoundingClientRect().top;
  }
  onScroll = (event): void => {
    if (!this.mobileView) {
      // Only available for deskop
      this.leftSectionInView();
    }
    if (!this.scrollCached) {
      setTimeout(() => {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 300) {
          // console.log('no im  here');
          if (this.userFeeds.length >= 0 && !this.endOfPosts) {
            // console.log('check network call', this.endOfPosts);
            if (!this.loading) {
              this.getUserFeeds();
            }
          }
        }
        this.scrollCached = null;
      }, 100);
    }
    this.scrollCached = event;
  }
  ngOnDestroy() {
    this.feedProfile.nativeElement.removeEventListener('scroll', this.onScroll, true);
    this.renderer.removeStyle(document.getElementsByTagName("body")[0], "overflow");
    this.userObserver.complete();
    this.uiService.resetTitle();
    if (this.trackerInstance)
      this.trackerInstance.destroy();
  }
  postFeed(event) {
    if (event.postActionId) {
      this.userFeeds = [event, ...this.userFeeds];
    } else {
      this.getUserFeeds();
    }
  }
  getUserFeeds() {
    this.loading = true;
    this.userProfilePageService.getUserFeeds(this.userId, this.page).subscribe((res: any) => {
      if (res.content.length) {
        this.page++;
        this.loading = false;
        res.content.forEach(post => {
          this.userFeeds.push(post);
        });
      } else {
        this.endOfPosts = true;
        this.loading = false;
      }
    }, error => {
      this.loading = false;
    });
  }
  getUserProfileDetails() {
    this.userProfilePageService.getUserProfile(this.url).subscribe((res: User) => {
      this.user = res;
      this.userObserver.next(this.user);
      this.userQuestionListRef.setUserData(this.user);
      if (res?.banner?.avatarLink) {
        this.renderer.removeStyle(this.userBannerImgRef.nativeElement, "min-height");
        this.userBannerImage = res.banner.avatarLink;
      }
      this.userAvatarImage = res.avatarDTO.avatarLink;
      this.renderer.removeStyle(this.userAvatarImgRef.nativeElement, "min-width");
      this.renderer.removeStyle(this.userAvatarImgRef.nativeElement, "min-height");
      this.relation = res.userMeta.relationShipType;
      this.userId = res.userId;
      this.getUserFeeds();
      this.isBannerLoding = false;
      this._activityService.start(this.user.userId, TrackingEntityType.user)
        .then((trackerInstance: TrackingInstance) => {
          this.trackerInstance = trackerInstance;
        })
    }, error => {
      // console.log(error.error.errorMessage);
    });
  }
  // updateUserAvatar(event) {
  //   let file = null;
  //   if (event.target.files && event.target.files.length) {
  //     const formData: FormData = new FormData();
  //     file = event.target.files[0];
  //     formData.set('file', file, file.name);
  //     this.userProfilePageService.updateProfilePicture(formData).subscribe((res: any) => {
  //       this.userAvatarImage = res.avatarLink;
  //     }, error => {
  //       // console.log(error.error.errorMessage);
  //     });
  //   } else {
  //     // console.log('Upload valid Picture');
  //   }
  // }

  triggerFalseClick($event) {
    $event.stopPropagation();
    // const src = document.getElementById('fileInput').click();
    this.imageCropperRef.openImageCropper();
  }
  imageDataReceiver(file) {
    const reader = new FileReader();
    if (file) {
      const formData: FormData = new FormData();
      formData.set('file', file, file.name);
      this.userProfilePageService.updateProfilePicture(formData).subscribe((res: any) => {
        this.userAvatarImage = res.avatarLink;
      }, error => {
        // console.log(error.error.errorMessage);
      });
    }
  }
  getCommunityFollowedByUser() {
    this.api.getJoinedCommunities(this.loginService.getUserId(), 0).subscribe((res: any) => {
    }, error => {
      // console.log(error.error.errorMessage);
    });
  }
  getImageUrl(url) {
    if (url) {
      return url;
    } else {
      return StaticMediaSrc.userFile;
    }
  }
  openEditDialog($event): void {
    $event.stopPropagation();
    let config = null;
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
        panelClass: 'full-screen-modal',
        data: { slug: this.url }
      };
    } else {
      config = {
        width: '500px',
        // height: '400px',
        data: { slug: this.url }
      };
    }
    const dialogRef = this.dialog.open(EditUserComponent, config);

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  removePostNotify($event) {
    this.userFeeds = this.userFeeds.filter((post: Post) =>
      post.postActionId !== $event
    );
  }

  getUserInfo() {
    // console.log('getUserInfo entered');
    this.userActivityService.getUserInfo(this.url).subscribe((res: UserInfo) => {
      this.userInfo = res;
      this.userCommunityBoxRef?.setCommunityCount(this.userInfo.ownsCommunities);
      this.joinedCommunityBoxRef?.setCommunityCount(this.userInfo.followsCommunities);
      this.userQuestionListRef?.setTotalCounts(this.userInfo.totalQuestions);
      // console.log(res);
    }, error => {
      // console.log(error.error.errorMessage);
    });
  }

  previewImage() {
    // const src = document.getElementById('communityImageSrc').click();
    this.userBannerImageCropperRef.openImageCropper();
  }

  imageDataReceiverOfBanner(file) {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.userBannerImage = reader.result as string;
        this.comUpdatedAvatar = file;
        this.changeUserBanner();
      };
    }
  }

  changeUserBanner() {
    if (this.comUpdatedAvatar) {
      const formData = new FormData();
      formData.set('file', this.comUpdatedAvatar, this.comUpdatedAvatar.name);
      this.userProfilePageService.updateUserBanner(formData).subscribe((res: any) => {
      }, error => {
      });
    }
  }

  toggleUserBanner($event) {
    this.showBanner = !this.showBanner;
    // $event.stopPropagation();
    // this.showBanner = true;
    // setTimeout(() => {
    //   this.showBanner = false;
    // }, 1500);
  }

  leftSectionInView() {
    // console.log("this.leftPartInitialHeight", this.leftPartSection);
    var bounding = this.userProfileLeftPartContainerRef.nativeElement.getBoundingClientRect();
    // console.log("bouding", bounding);
    // Left section is not in view
    if (bounding.top <= this.leftPartSection.leftPartInitialHeight * 0.8) {
      // console.log("Adding make-fixed");
      if (!this.leftPartSection.hasAddedMakeFixedToLeftPart) {
        // console.log("Added make-fixed");
        this.leftPartSection.hasAddedMakeFixedToLeftPart = true;
        this.renderer.addClass(this.userProfileLeftPartRef.nativeElement, "make-fixed");
        if (this.leftPartSection.footerHeight) {
          // console.log("Setting margin-bottom ", this.leftPartSection.footerHeight)
          this.renderer.setStyle(this.userProfileLeftPartBodyRef.nativeElement, "padding-bottom", this.leftPartSection.footerHeight + "px");
        }
      }
    } else {
      // console.log("Removing make-fixed");
      if (this.leftPartSection.hasAddedMakeFixedToLeftPart) {
        // console.log("Removed make-fixed");
        this.leftPartSection.hasAddedMakeFixedToLeftPart = false;
        this.renderer.removeClass(this.userProfileLeftPartRef.nativeElement, "make-fixed");
        this.renderer.removeStyle(this.userProfileLeftPartBodyRef.nativeElement, "padding-bottom");
      }
    }
  }
}
