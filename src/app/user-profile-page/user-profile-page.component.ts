import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ImgCropperWrapperComponent } from 'img-cropper-wrapper/img-cropper-wrapper.component';
import { Subject } from 'rxjs';
import { UIService } from 'ui/ui.service';
import { UserActivityService } from 'user-activity/user-activity.service';
import { LoginService } from '../auth/login.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Post } from '../models/post-action.model';
import { User, UserInfo } from '../models/user.model';
import { ApiService } from '../shared/api.service';
import { UserProfileCardServiceComponent } from '../user-profile-card/user-profile-card-service.component';
import { UserProfilePageService } from './user-profile-page.service';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { RelationType } from 'models/relation-type';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent implements OnInit {
  constructor(public userProfilePageService: UserProfilePageService, public route: ActivatedRoute, public userFollowersService: UserProfileCardServiceComponent,
    public loginService: LoginService, public api: ApiService, private meta: Meta, private uiService: UIService, private router: Router,
    private userActivityService: UserActivityService,
    public dialog: MatDialog) {
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
  loading = false;
  page = 0;
  endOfPosts = false;
  userFeeds = [];
  userId: any;
  mobileView = false;
  screenWidth = window.innerWidth;
  scrollCached: boolean = null;
  @ViewChild("userBannerImageCropperRef") userBannerImageCropperRef: ImgCropperWrapperComponent;
  userInfo: UserInfo;
  defaultUserSrc: string = StaticMediaSrc.userFile;

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
    this.url = this.route.snapshot.paramMap.get('userSlug');
    this.getUserProfileDetails();
    this.getUserInfo();
    this.getCommunityFollowedByUser();
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
  }
  scroll = (event): void => {
    if (!this.scrollCached) {
      setTimeout(() => {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 300) {
          // console.log('no im  here');
          if (this.userFeeds.length >= 0 && !this.endOfPosts) {
            // console.log('check network call', this.endOfPosts);
            this.loading = true;
            ++this.page;
            this.getUserFeeds(this.userId);
          }
        }
        this.scrollCached = null;
      }, 100);
    }
    this.scrollCached = event;
  }
  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
    this.userObserver.complete();
    this.uiService.resetTitle();
  }
  postFeed(event) {
    if (event.postActionId) {
      this.userFeeds = [event, ...this.userFeeds];
    } else {
      this.getUserFeeds(this.userId);
    }
  }
  getUserFeeds(userId) {
    if (!userId) return;
    this.userProfilePageService.getUserFeeds(userId, this.page).subscribe((res: any) => {
      if (res.content.length) {
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
      this.userObserver.next(res);
      this.user = res;
      if (res?.banner?.avatarLink) {
        this.userBannerImage = res.banner.avatarLink;
      }
      this.userAvatarImage = res.avatarDTO.avatarLink;
      this.relation = res.userMeta.relationShipType;
      this.userId = res.userId;
      this.getUserFeeds(res.userId);
      this.isBannerLoding = false;
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

  triggerFalseClick() {
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
  openEditDialog(): void {
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

}
