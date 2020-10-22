import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { CommonService } from '../../common/common.service';
import { FeedTextComponent } from '../../feed-text/feed-text.component';
import { FeedsService } from '../../feeds-frame/feeds.service';
import { GlobalService } from '../../global.service';
import { IFramelyService } from '../../meta-card/iframely.service';
import { AvatarDTO } from '../../models/common.model';
import { HashTag } from '../../models/hashtag.model';
import { IFramelyData } from '../../models/iframely.model';
import { Post, PostEditorType, PostMedia, ResourceType } from '../../models/post-action.model';
import { UserListData, UserListType } from '../../models/user-list.model';
import { SharePostComponent } from '../../shared/components/dialogs/share-post/share-post.component';
import { UserListComponent } from '../../shared/components/dialogs/user-list/user-list.component';
import { GlobalConstants } from '../../shared/constants';
import { ProfileIconComponent } from '../../shared/profile-icon/profile-icon.component';
import { UIService } from '../../ui/ui.service';
import { UserProfileCardServiceComponent } from '../../user-profile-card/user-profile-card-service.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';
declare var $: any;

@Component({
  selector: 'app-recommended-feeds',
  templateUrl: './recommended-feeds.component.html',
  styleUrls: ['./recommended-feeds.component.scss']
})
export class RecommendedFeedsComponent implements OnInit, OnDestroy {
  @Input() feed: Post;
  @ViewChild('feedTextComponent') feedTextComponent: FeedTextComponent;
  @Output() removePostEvent = new EventEmitter();
  @Input() showUserHeader: boolean = false;
  // @ViewChild("metaCardComponentRef", { static: true }) metaCardComponentRef: MetaCardComponent;
  // @ViewChild(MetaCardComponent, { static: true }) set metaCard(metaCardComponentRef: MetaCardComponent) {
  //   if (!!metaCardComponentRef) {
  //     this.metaCardComponentRef = metaCardComponentRef;
  //   }
  // }
  iFramelyData: IFramelyData;
  isLoading = false;
  isCommentLoading = false;
  loggedInUsername: string;
  postLink: string;
  mobileView = false;
  loggedInUserId: any;
  hashTagsData: any = {};
  userPath: string = GlobalConstants.userPath;
  communityPath: string = GlobalConstants.communityPath;
  editableFeed: Post;
  displayText: string;
  postPath: string = GlobalConstants.postPath;
  isYouTubeVideoLink: boolean = false;
  safeYoutubeLink: SafeResourceUrl;
  youtubeLinkTemplate: string = "https://youtube.com/embed/";
  viewMediaList: PostMedia[] = [];
  applicationMediaList: PostMedia[] = [];
  @ViewChild("feedViewContainer") feedViewContainer: ElementRef;
  viewPortPassed: boolean = false;
  userListTypeClass = UserListType;
  profileIconRef: ProfileIconComponent;
  @ViewChild("profileIcon")
  set profileIcon(profileIconRef: ProfileIconComponent) {
    this.profileIconRef = profileIconRef;
  }
  commentComponentRef: CreateCommentComponent;
  @ViewChild("commentComponent")
  set commentComponent(commentComponentRef: CreateCommentComponent) {
    this.commentComponentRef = commentComponentRef;
  }

  constructor(private feedsService: FeedsService,
    public login: LoginService,
    private dialog: MatDialog,
    public userProfileCardServiceComponent: UserProfileCardServiceComponent,
    private commonService: CommonService,
    private iFramelyService: IFramelyService,
    public snackbar: MatSnackBar,
    private router: Router,
    private _sanitizer: DomSanitizer,
    private uiService: UIService,
    private _globalService: GlobalService) {
    this.login.avatarSubject.subscribe((avatar: AvatarDTO) => {
      // console.log("RECOMMENDED FEEDS SUBJECT", avatar);
      this.profileIconRef?.setAvatar(avatar);
    });
  }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
    if (!this.showUserHeader) {
      if (this.feed?.communityDTO) {
        this.showUserHeader = false;
      } else {
        this.showUserHeader = true;
      }
    }
    for (let mediaIndex = 0; mediaIndex < this.feed.postMediaList.length; mediaIndex++) {
      if (this.feed.postMediaList[mediaIndex]?.resourceType === ResourceType.application) {
        this.applicationMediaList.push(this.feed.postMediaList[mediaIndex]);
      } else {
        this.viewMediaList.push(this.feed.postMediaList[mediaIndex]);
      }
    }
    this.editableFeed = Object.assign({}, this.feed);
    this.loggedInUsername = this.login.getLocalUserProfile().sub;
    this.loggedInUserId = this.login.getLocalUserProfile().id;
    this.parseFeedText();
  }
  async parseFeedText() {
    if (this.feed.postData.text)
      this.displayText = this.feed.postData.text;
    if (this.displayText && this.displayText.length > 0 && this.feed.postData.postEditorType !== PostEditorType.blog) {
      this.displayText.replace('\n', '<br>');
      this.feed.hashTags.forEach((hashTag: HashTag) => {
        // let hashTagNode = document.createElement("span");
        // hashTagNode.style.color = 'red';
        var regEx = new RegExp("#" + hashTag.hashTagValue, "ig");
        let index = this.commonService.indexOfUsingRegex(this.displayText, regEx, 0);
        if (index >= 0) {
          this.hashTagsData[index] = hashTag.hashTagValue.length + 1;
          this.displayText = this.displayText.substr(0, index) +
            "<app-hash-tag hash-tag-value=\"" + hashTag.hashTagValue + "\"></app-hash-tag>" +
            this.displayText.substr(index + hashTag.hashTagValue.length + 1);
        }
      });
      let detectedLink: string = this.commonService.parseTextToFindURL(this.displayText);
      if (detectedLink) {
        let youTubeId = this.commonService.getYouTubeVideoId(detectedLink);
        if (youTubeId) {
          this.isYouTubeVideoLink = true;
          this.safeYoutubeLink = this._sanitizer.bypassSecurityTrustResourceUrl(this.youtubeLinkTemplate + youTubeId);
        } else {
          this.isYouTubeVideoLink = false;
          this.iFramelyData = await this.iFramelyService.getIFramelyData(detectedLink);
        }
      }
    }
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.uiService.resetTitle();
  }

  likePost(id) {
    this.isLoading = true;
    if (this.feed.postActionMeta.liked) {
      this.dislikedPost();
      this.feedsService.dislikePost(id).subscribe(
        (res: any) => {
          if (res.status !== 200) { this.likedPost(); }
        }, err => { this.likedPost(); }
      );
    } else {
      this.likedPost();
      this.feedsService.likePost(id).subscribe(
        (res: any) => {
          if (res.status !== 200) { this.dislikedPost(); }
        }, err => { this.dislikedPost(); }
      );
    }
  }

  likedPost() {
    this.isLoading = false;
    this.feed.postActionMeta.liked = true;
    ++this.feed.postActionMeta.totalLikes;
  }

  dislikedPost() {
    this.isLoading = false;
    this.feed.postActionMeta.liked = false;
    --this.feed.postActionMeta.totalLikes;
  }

  toggleComments() {
    this.commentComponentRef.toggleComments();
  }

  getUserId() {
    return this.login.getUserId();
  }
  unFollow(userId) {
    this.userProfileCardServiceComponent.unfollowMe(this.loggedInUserId, userId).subscribe((res: any) => {
      // console.log(res);
    }, error => {
      // console.log(error.error.errorMessage);
    });
  }
  openUserGroupDialog(type): void {
    let config = null;
    let userListData: UserListData = new UserListData();
    userListData.postId = this.feed.postActionId;
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
        maxWidth: "80vw",
        maxHeight: '70vh',
        panelClass: 'user-list-modal',
        overflow: "hidden",
        // data: userList
        data: userListData
      };
    }
    const dialogRef = this.dialog.open(UserListComponent, config);
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  removePost($event) {
    this.removePostEvent.emit($event);
  }

  openShareDialog() {
    let clickAction = this.commonService.getPostSharableLink(this.feed);
    this.dialog.open(SharePostComponent, {
      width: '500px',
      data: { url: clickAction }
    });
  }

  updatePostEvent($event) {
    this.feed = $event;
    this.parseFeedText();
    this.editableFeed = Object.assign({}, this.feed);
    this.feedTextComponent.text = this.displayText;
    this.feedTextComponent.ngOnInit();
  }

  openBlog() {
    if (this.feed.slug) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/', GlobalConstants.postBlogPath, this.feed.slug])
      );

      window.open(url, '_blank');
    }
  }

  feedCameInView() {
    this.viewPortPassed = true;
    this.feedsService.visitPost(this.feed.postActionId).subscribe();
  }

  elementInViewport() {
    if (!this.viewPortPassed) {
      var bounding = this.feedViewContainer.nativeElement.getBoundingClientRect();
      if (bounding.top >= 0 && bounding.left >= 0
        && bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
        this.feedCameInView();
      }
    }
  }
  // openFullScreenMediaContainer(index: number) {
  //   // Only Images are allowed for full screen view, as videos has the option for full screen
  //   let mediaList: PostMedia[] = this.feed.postMediaList.filter((postMedia: PostMedia) => {
  //     return postMedia.resourceType === ResourceType.image;
  //   });
  //   console.log("mediaList", mediaList);
  //   this.fullScreenMedia.open(this.feed.postActionId, mediaList);
  // }
}
