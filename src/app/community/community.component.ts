import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'models/page.model';
import { UIService } from 'ui/ui.service';
import { LoginService } from '../auth/login.service';
import { Community, CommunityPrivacy, CommunityProfileMeta } from '../models/community.model';
import { Post } from '../models/post-action.model';
import { User } from '../models/user.model';
import { DescriptionComponent } from '../shared/components/dialogs/description/description.component';
import { CommunityService } from './community.service';
import { CommunityUsersComponent } from 'community-users/community-users.component';
import { ImgCropperWrapperComponent } from 'img-cropper-wrapper/img-cropper-wrapper.component';
import { CommonService } from 'common/common.service';
import { UserListComponent } from 'shared/components/dialogs/user-list/user-list.component';
import { RelationType } from 'models/relation-type';
import { SharePostComponent } from 'shared/components/dialogs/share-post/share-post.component';
import { GlobalConstants } from 'shared/constants';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { QuestnrActivityService } from 'shared/questnr-activity.service';
import { TrackingEntityType, TrackingInstance } from 'models/user-activity.model';
import { GlobalService } from 'global.service';
import { UserListData, UserListType } from 'models/user-list.model';
import { Subscription } from 'rxjs';
import { ConfirmDialogContentType } from 'models/confirm-dialog.model';
import { ConfirmDialogComponent } from 'confirm-dialog/confirm-dialog.component';

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
  loading: boolean = false;
  communityId: number;
  mobileView: boolean = false;
  scrollCached: boolean = null;
  owned: string = RelationType.OWNED;
  followed: string = RelationType.FOLLOWED;
  none: string = RelationType.NONE;
  // To show user post header instead of community post header
  showUserHeader: boolean = true;
  trackerInstance: TrackingInstance;
  @ViewChild('communityFeed') communityFeed: ElementRef;
  pendingRequests: number;
  isCommunityPrivate = false;
  explorePath = GlobalConstants.explorePath;
  relationType = RelationType;
  isAllowedIntoCommunity: boolean;
  fetchCommunityFeedsSubscriber: Subscription;
  userListTypeClass = UserListType;

  constructor(public communityService: CommunityService,
    public fb: FormBuilder,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public loginAuth: LoginService,
    private uiService: UIService,
    private router: Router,
    public commonService: CommonService,
    private _activityService: QuestnrActivityService, private _globalService: GlobalService,
    private renderer: Renderer2) {
    this.loggedInUserId = loginAuth.getLocalUserProfile().id;
    this.mobileView = this._globalService.isMobileView();
  }

  public trackItem(index: number, feed: Post) {
    return feed.slug;
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

  ngOnInit() {
    this.communitySlug = this.route.snapshot.paramMap.get('communitySlug');
    this.route.data.subscribe((data: { community: Community }) => {
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
      if (this.owner === RelationType.OWNED) {
        this.getCommunityJoinRequests();
      }
      this._activityService.start(this.communityDTO.communityId, TrackingEntityType.community)
        .then((trackerInstance: TrackingInstance) => {
          this.trackerInstance = trackerInstance;
        });
    });
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  restartCommunityFeeds(callFromConstructor: boolean = false) {
    // this.ngOnInit();
    // this.getCommunityDetailsById();
    this.isAllowedIntoCommunity = this.communityService.isAllowedIntoCommunity(this.communityDTO);

    // No need to re-fetch feeds again if the community is not private.
    if (!callFromConstructor && this.communityDTO.communityPrivacy == CommunityPrivacy.pub) return;

    this.userFeeds = [];
    this.page = 0;

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

  ngAfterViewInit() {
    this.communityFeed.nativeElement.addEventListener('scroll', this.onScroll, true);
    this.renderer.setStyle(document.getElementsByTagName('body')[0], 'overflow', 'hidden');
    this.mobileView = this._globalService.isMobileView();
  }

  ngOnDestroy() {
    if (this.fetchCommunityFeedsSubscriber) {
      this.fetchCommunityFeedsSubscriber.unsubscribe();
    }
    this.communityFeed.nativeElement.removeEventListener('scroll', this.onScroll, true);
    this.renderer.removeStyle(document.getElementsByTagName('body')[0], 'overflow');
    this.uiService.resetTitle();
    this.trackerInstance.destroy();
  }

  onScroll = (event): void => {
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

  postFeed(event) {
    if (event.postActionId) {
      this.userFeeds = [event, ...this.userFeeds];
    } else {
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
}
