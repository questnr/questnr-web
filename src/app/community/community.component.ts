import {Component, ElementRef, OnInit, ViewChild, Renderer2} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from 'models/page.model';
import {UIService} from 'ui/ui.service';
import {LoginService} from '../auth/login.service';
import {Community} from '../models/community.model';
import {Post} from '../models/post-action.model';
import {User} from '../models/user.model';
import {DescriptionComponent} from '../shared/components/dialogs/description/description.component';
import {CommunityService} from './community.service';
import {CommunityUsersComponent} from 'community-users/community-users.component';
import {ImgCropperWrapperComponent} from 'img-cropper-wrapper/img-cropper-wrapper.component';
import {CommonService} from 'common/common.service';
import {UserListComponent} from 'shared/components/dialogs/user-list/user-list.component';
import {RelationType} from 'models/relation-type';
import {SharePostComponent} from 'shared/components/dialogs/share-post/share-post.component';
import {GlobalConstants} from 'shared/constants';
import {StaticMediaSrc} from 'shared/constants/static-media-src';
import {QuestnrActivityService} from 'shared/questnr-activity.service';
import {TrackingEntityType, TrackingInstance} from 'models/user-activity.model';
import {GlobalService} from '../global.service';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

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
  owner: any;
  comUserList: any[];
  ownerDTO: User;
  comUpdatedAvatar: any;
  communityImage: string = StaticMediaSrc.communityFile;
  loggedInUserId: any;
  page = 0;
  endOfPosts = false;
  userFeeds: Post[] = [];
  loading = true;
  communityId: any;
  mobileView = false;
  screenWidth = window.innerWidth;
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

  constructor(public auth: CommunityService, public fb: FormBuilder, public dialog: MatDialog, public snackBar: MatSnackBar,
              private route: ActivatedRoute, public loginAuth: LoginService, private uiService: UIService, private router: Router,
              public commonService: CommonService,
              private _activityService: QuestnrActivityService, private _globalService: GlobalService,
              private renderer: Renderer2) {
    this.loggedInUserId = loginAuth.getUserProfile().id;
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
  };

  ngOnInit() {
    this.communitySlug = this.route.snapshot.paramMap.get('communitySlug');
    this.route.data.subscribe((data: { community: Community }) => {
      this.communityDTO = data.community;
      this.description = data.community.description;
      if (this.communityDTO?.avatarDTO?.avatarLink) {
        this.communityImage = this.communityDTO.avatarDTO.avatarLink;
      }
      this.ownerDTO = this.communityDTO.ownerUserDTO;
      this.owner = this.communityDTO.communityMeta.relationShipType;
      if (this.owner === 'owned') {
        this.getCommunityJoinRequests(this.communityDTO.communityId);
      }
      this.userFeeds = [];
      this.loading = true;
      this.fetchCommunityFeeds(this.communityDTO.communityId);
      this._activityService.start(this.communityDTO.communityId, TrackingEntityType.community)
        .then((trackerInstance: TrackingInstance) => {
          this.trackerInstance = trackerInstance;
        });
    });
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngAfterViewInit() {
    this.communityFeed.nativeElement.addEventListener('scroll', this.onScroll, true);
    this.renderer.setStyle(document.getElementsByTagName('body')[0], 'overflow', 'hidden');
    this.mobileView = this._globalService.isMobileView();
  }

  ngOnDestroy() {
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
          if (this.userFeeds.length >= 0 && !this.endOfPosts) {
            // console.log('check network call', this.endOfPosts);
            if (!this.loading) {
              this.loading = true;
              this.fetchCommunityFeeds(this.communityId);
            }
          }
        }
        this.scrollCached = null;
      }, 100);
    }
    this.scrollCached = event;
  };

  postFeed(event) {
    if (event.postActionId) {
      this.userFeeds = [event, ...this.userFeeds];
    } else {
      this.loading = true;
      this.fetchCommunityFeeds(this.communityId);
    }
  }

  fetchCommunityFeeds(communityId) {
    this.communityId = communityId;
    this.auth.getCommunityFeeds(communityId, this.page).subscribe((res: Page<Post>) => {
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
    });
  }

  changeCommunityAvatar() {
    if (this.comUpdatedAvatar) {
      const formData = new FormData();
      formData.set('file', this.comUpdatedAvatar, this.comUpdatedAvatar.name);
      this.auth.updateCommunityAvatar(formData, this.communityDTO.communityId).subscribe((res: any) => {
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
    this.snackBar.open('Link copied to clipboard', 'close', {duration: 5000});
    // let snackBarRef = this.snackbar.open('Copying Link..');
    // this.commonService.copyToClipboard(this.commonService.getCommunitySharableLink(this.communitySlug));
    // snackBarRef.dismiss();
    // this.auth.getSharableLink(this.communityId).subscribe((res: any) => {
    //   this.commonService.copyToClipboard(res.clickAction);
    //   snackBarRef.dismiss();
    // });
  }

  removePostNotify($event) {
    this.userFeeds = this.userFeeds.filter((userFeed: Post) =>
      userFeed.postActionId !== $event);
  }

  actionEvent($event) {
    this.owner = $event;
    // console.log("Event", $event);
    this.communityUsersComponentRef.ngOnInit();
  }

  getCommunityJoinRequests(communityId) {
    this.auth.getCommunityJoinRequests(communityId, 0).subscribe((res: any) => {
      this.pendingRequests = res.numberOfElements;
    });
  }

  openUserGroupDialog(type): void {
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
        data: {
          userId: this.loggedInUserId,
          communityId: this.communityId,
          type
        }
      };
    } else {
      config = {
        // width: '500px',
        // data: userList,
        maxHeight: '60vh',
        maxWidth: '80vw',
        overflow: 'hidden',
        data: {
          userId: this.loggedInUserId,
          communityId: this.communityId,
          type
        }
      };
    }
    const dialogRef = this.dialog.open(UserListComponent, config);

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openShareDialog() {
    let clickAction = this.commonService.getCommunitySharableLink(this.communitySlug);
    this.dialog.open(SharePostComponent, {
      width: '500px',
      data: {url: clickAction}
    });
  }

  toggleCommunityPrivacy(updatedPrivacy) {
    this.auth.toggleCommunityPrivacy(this.communityId, updatedPrivacy).subscribe((res: Community) => {
      if (res.communityPrivacy === 'pri') {
        this.isCommunityPrivate = true;
      }
      if (res.communityPrivacy === 'pub') {
        this.isCommunityPrivate = false;
      }
      this.snackBar.open('Community privacy updated', 'close', {duration: 3000});
    }, error => {
      this.snackBar.open(error.error.errorMessage, 'close', {duration: 3000});
    });
  }

  communityPrivacyDialog() {
    const title = (this.isCommunityPrivate) ? 'Make "' + this.communityDTO.communityName + '" Public?' : 'Make "' + this.communityDTO.communityName + '" Private?';
    const innerHTML = (this.isCommunityPrivate) ? '<ul>\n' +
      '      <li>All the pending community join requests will be approved automatically.</li>\n' +
      '      <li>All the community members and community posts will be visible to public.</li>\n' +
      '      <li>Any Questnr member will be able to join the community without admin\'s approval.</li>\n' +
      '    </ul>' : '<ul>\n' +
      '      <li>All the requests has to be approved  by the admin manually.</li>\n' +
      '      <li>Community members and Community posts will be visible only to the joined community members.</li>\n' +
      '      <li>Community will not be displayed in the trending or suggested communities section.  </li>\n' +
      '    </ul>';
    const agreeText = 'Yes! I understand';
    const disagreeText = 'Cancel';

    let dialogConfig;
    if (this.mobileView) {
      dialogConfig = {
        maxWidth: '100vw',
        width: '100%',
        data: {
          title,
          mobileView: this.mobileView,
          innerHTML,
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
          innerHTML,
          agreeText,
          disagreeText
        }
      };
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result?.data) {
        const userId = this.loginAuth.getUserProfile().id;
        const privacy = (this.isCommunityPrivate) ? 'pub' : 'pri';
        this.toggleCommunityPrivacy(privacy);
      }
    });
  }
}
