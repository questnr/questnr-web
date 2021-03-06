import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachedFileListComponent } from 'attached-file-list/attached-file-list.component';
import { LoginSignupModalComponent } from 'auth/login-signup-modal/login-signup-modal.component';
import { LoginService } from 'auth/login.service';
import { FeedsService } from 'feeds-frame/feeds.service';
import { CreateCommentComponent } from 'feeds-frame/recommended-feeds/create-comment/create-comment.component';
import { GlobalService } from 'global.service';
import { AvatarDTO, CustomError } from 'models/common.model';
import { PostActionForMedia, PostEditorType, PostMedia, PostType, QuestionParentType, ResourceType } from 'models/post-action.model';
import { SinglePost } from 'models/single-post.model';
import { TrackingEntityType, TrackingInstance } from 'models/user-activity.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { ProfileIconComponent } from 'shared/profile-icon/profile-icon.component';
import { QuestnrActivityService } from 'shared/questnr-activity.service';
import { SignInRequiredModalComponent } from 'shared/sign-in-required-modal/sign-in-required-modal.component';
import { UIService } from 'ui/ui.service';
import { CommonService } from '../common/common.service';
import { IFramelyService } from '../meta-card/iframely.service';
import { CommentAction, CommentParentClassType } from '../models/comment-action.model';
import { HashTag } from '../models/hashtag.model';
import { IFramelyData } from '../models/iframely.model';
import { SharePostComponent } from '../shared/components/dialogs/share-post/share-post.component';
import { GlobalConstants } from '../shared/constants';
import { SinglePostService } from './single-post.service';

enum postType {
  media, text, metacard, blog
}
@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})

export class SinglePostComponent implements OnInit {
  iFramelyData: IFramelyData;
  userPath = GlobalConstants.userPath;
  communityPath = GlobalConstants.communityPath;
  loginURL = GlobalConstants.login;
  replyingTo: any;
  fullscreen = false;
  isLoading = true;
  isCommentLoading = false;
  feedUrl = GlobalConstants.feedPath;
  comment = new FormControl('', Validators.required);
  replyComment = new FormControl('', Validators.required);
  mobileView = false;
  viewType = postType.media;
  postSlug: string;
  singlePost: SinglePost;
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true,
    autoplay: false
  };
  hashTagsData: any = {};
  // Thie will turn off "read more" functionality
  readMore: boolean = false;
  displayText: string;
  errorOnImageIndexList: number[] = [];
  actionAllowed: boolean = false;
  isYouTubeVideoLink: boolean = false;
  safeYoutubeLink: SafeResourceUrl;
  youtubeLinkTemplate: string = "https://youtube.com/embed/";
  commentInputRef: ElementRef;
  @ViewChild('commentInput')
  set commentInput(commentInputRef: ElementRef) {
    this.commentInputRef = commentInputRef;
  }
  @ViewChild('commentAttachFileInput')
  set commentAttachFileInput(commentAttachFileInputRef: any) {
    this.commentAttachFileInputRef = commentAttachFileInputRef;
  }
  commentAttachFileInputRef: ElementRef;
  @ViewChild('attachedFileListComponent') attachedFileListComponent: AttachedFileListComponent;
  attachedFileList = [];
  viewMediaList: PostMedia[] = [];
  applicationMediaList: PostMedia[] = [];
  showUserHeader: boolean = false;
  defaultUserSrc: string = StaticMediaSrc.userFile;
  trackerInstance: TrackingInstance;
  error: CustomError;
  @ViewChild("loginSignupModal") loginSignupModal: LoginSignupModalComponent;
  PostTypeClass = PostType;
  profileIconRef: ProfileIconComponent;
  @ViewChild("profileIcon")
  set profileIcon(profileIconRef: ProfileIconComponent) {
    this.profileIconRef = profileIconRef;
  }
  questionParentTypeClass = QuestionParentType;
  signInRequiredModalRef: SignInRequiredModalComponent;
  @ViewChild("signInRequiredModal")
  set signInRequiredModal(signInRequiredModalRef: SignInRequiredModalComponent) {
    this.signInRequiredModalRef = signInRequiredModalRef;
  }
  loginSignInModalTimeout;
  commentComponentRef: CreateCommentComponent;
  @ViewChild("commentComponent")
  set commentComponent(commentComponentRef: CreateCommentComponent) {
    this.commentComponentRef = commentComponentRef;
  }
  commentParentClassTypeClass = CommentParentClassType;

  constructor(private api: FeedsService, private route: ActivatedRoute, private singlePostService: SinglePostService,
    public loginService: LoginService,
    public uiService: UIService,
    public dialog: MatDialog,
    private router: Router,
    private commonService: CommonService,
    private iFramelyService: IFramelyService,
    private _sanitizer: DomSanitizer,
    private _activityService: QuestnrActivityService,
    private _globalService: GlobalService) {
    this.postSlug = this.route.snapshot.paramMap.get('postSlug');
  }

  ngOnInit(): void {
    if (this.loginService.loggedIn()) {
      this.actionAllowed = true;
    }
    // console.log(this.loginService.getUserProfileImg());
    this.mobileView = this._globalService.isMobileView();
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.route.data.subscribe((data) => {
      if (data.singlePost.error) {
        this.error = data.singlePost.error;
        return;
      }
      else if (data.singlePost.hasError) {
        this.error = new CustomError();
        this.error.errorCode = 400;
        this.singlePost = data.singlePost;
        return;
      }
      this.singlePost = data.singlePost;
      // console.log("this.singlePost", this.singlePost);
      this.startThread();
      this.isLoading = false;
      this._activityService.start(this.singlePost.postActionId, TrackingEntityType.post).then((trackerInstance: TrackingInstance) => {
        this.trackerInstance = trackerInstance;
      }, (error) => {
        // console.log("ERROR", error);
      });
    });
    // this.fetchPost(this.postSlug);
    // console.log(this.loginService.getUserProfileImg());
  }

  ngAfterViewInit() {
    if (!this.error) {
      let loginSignupModalTitle;
      if (this.showUserHeader) {
        loginSignupModalTitle = `Follow ${this.singlePost.userDTO.username}`
      } else {
        loginSignupModalTitle = `Join ${this.singlePost.communityDTO.communityName} Community`;
      }
      this.loginSignInModalTimeout = setTimeout(() => {
        // If user is not logged in, show LoginSignModal
        // Not open when sign in required modal is opened
        if (!this.actionAllowed && !this.signInRequiredModalRef?.isOpen) {
          this.loginSignupModal.open(loginSignupModalTitle);
        }
      }, (7 * 1000));
    }

    this.loginService.avatarSubject.subscribe((avatar: AvatarDTO) => {
      // console.log("SINGLE POST SUBJECT", avatar);
      if (this.profileIconRef)
        this.profileIconRef.setAvatar(avatar);
    });
  }

  startThread() {
    if (!this.showUserHeader) {
      if (this.singlePost?.communityDTO) {
        this.showUserHeader = false;
      } else {
        this.showUserHeader = true;
      }
    }
    for (let mediaIndex = 0; mediaIndex < this.singlePost.postMediaList?.length; mediaIndex++) {
      if (this.singlePost.postMediaList[mediaIndex]?.resourceType === ResourceType.application) {
        this.applicationMediaList.push(this.singlePost.postMediaList[mediaIndex]);
      } else {
        this.viewMediaList.push(this.singlePost.postMediaList[mediaIndex]);
      }
    }
    this.checkPostViewType();
    this.parseFeed();
  }
  async parseFeed() {
    if (this.singlePost.postType === PostType.question) {
      return;
    }
    if (this.singlePost?.postData.text)
      this.displayText = this.singlePost.postData.text;
    if (this.singlePost.postData.postEditorType !== PostEditorType.blog) {
      this.displayText.replace('\n', '<br>');
      this.singlePost.hashTags.forEach((hashTag: HashTag) => {
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

  checkPostViewType() {
    if (this.singlePost?.postData?.postEditorType === PostEditorType.blog) {
      return this.viewType = postType.blog;
    }
    if (this.viewMediaList.length) {
      return this.viewType = postType.media;
    }
    // else if (this.iFramelyData && !this.iFramelyData.error) {
    //   return this.viewType = postType.metacard;
    // }
    return this.viewType = postType.text;
  }

  ngOnDestroy() {
    this.uiService.resetTitle();
    if (this.loginSignInModalTimeout) {
      clearTimeout(this.loginSignInModalTimeout);
    }
    if (this.signInRequiredModalRef?.isOpen) {
      this.signInRequiredModalRef.close();
    }
    if (this.loginSignupModal?.isOpen) {
      this.loginSignupModal.close();
    }
    if (this.trackerInstance)
      this.trackerInstance.destroy();
  }

  // fetchPost(postSlug: string) {
  //   this.singlePostService.getSinglePost(postSlug).subscribe((singlePost: SinglePost) => {
  //     this.uiService.setMetaTagsAndTitle('Post', singlePost.metaList);
  //     this.singlePost = singlePost;
  //     this.checkPostViewType();
  //     console.log(this.viewType);
  //     this.isLoading = false;
  //   });
  // }

  likePost(id) {
    this.isLoading = true;
    if (this.singlePost.postActionMeta.liked) {
      this.dislikedPost();
      this.api.dislikePost(id).subscribe(
        (res: any) => {
          if (res.status !== 200) {
            this.likedPost();
          }
        }, err => {
          this.likedPost();
        }
      );
    } else {
      this.likedPost();
      this.api.likePost(id).subscribe(
        (res: any) => {
          if (res.status !== 200) {
            this.dislikedPost();
          }
        }, err => {
          this.dislikedPost();
        }
      );
    }
  }

  likedPost() {
    this.isLoading = false;
    this.singlePost.postActionMeta.liked = true;
    ++this.singlePost.postActionMeta.totalLikes;
  }

  dislikedPost() {
    this.isLoading = false;
    this.singlePost.postActionMeta.liked = false;
    --this.singlePost.postActionMeta.totalLikes;
  }

  toggleComments() {
    this.commentComponentRef.toggleComments();
  }

  openShareDialog() {
    let clickAction = this.commonService.getPostSharableLink(this.singlePost);
    this.dialog.open(SharePostComponent, {
      width: '500px',
      data: { url: clickAction }
    });
  }

  fullScreen() {
    const elem = document.documentElement;
    const methodToBeInvoked = elem.requestFullscreen;
    if (methodToBeInvoked) {
      methodToBeInvoked.call(elem);
    }
    this.fullscreen = !this.fullscreen;
  }

  exitFullscreen() {
    document.exitFullscreen();
    this.fullscreen = !this.fullscreen;
  }

  deleteComment($event) {
    this.singlePost.commentActionList = this.singlePost.commentActionList.filter((comment: CommentAction) =>
      $event !== comment.commentActionId
    );
  }

  onError(index: number) {
    this.errorOnImageIndexList.push(index);
  }
  onLoad(index: number) {
    if (this.errorOnImageIndexList.includes(index)) {
      this.errorOnImageIndexList.splice(index, this.errorOnImageIndexList.length);
    }
  }
  onRefreshImageAtIndex(index: number) {
    this.api.getPostMediaList(this.singlePost.postActionId).subscribe((res: PostActionForMedia) => {
      this.singlePost.postMediaList = res.postMediaList;
      this.errorOnImageIndexList = [];
    });
  }

  openFileSelector() {
    this.commentAttachFileInputRef.nativeElement.click();
  }

  selectFiles(event) {
    if (event.target.files.length > 0) {
      this.filesDroppedOnComment(event.target.files);
    }
  }

  filesDroppedOnComment(droppedFiles) {
    this.attachedFileList = [];
    const files = Object.values(droppedFiles);
    files.forEach((file: any) => {
      if (file.type.includes('image') || file.type.includes('application')) {
        this.attachedFileList.push(file);
        this.showOnAttachedFileContainer(file);
      }
    });
  }

  showOnAttachedFileContainer(file) {
    this.attachedFileListComponent.pushFile(file);
  }

  finalizedAttachedFileListListener($event) {
    this.attachedFileList = $event;
  }

  clearAttachedFileList() {
    this.attachedFileList = [];
    this.attachedFileListComponent.clearAttachedFileList();
  }

  downloadErrorListener($event) {
    this.loginSignupModal.open("Please Login/Sign Up");
  }

  shouldShowHeader(): boolean {
    if (this.error && !this.loginService.loggedIn()) return true;
    return (!(this.viewType === 0 && !this.mobileView)) && !this.loginService.loggedIn();
  }

  shouldShowUserHeader(): boolean {
    if (this.error && this.loginService.loggedIn())
      return true;
    return ((this.viewType === 0 && this.mobileView) ||
      (this.viewType === 1) || (this.viewType === 3) || ((this.singlePost?.postType === PostType.question))) &&
      this.loginService.loggedIn();
  }

  respondingActionListener($event) {
    if ($event?.signInRequiredError) {
      this.signInRequiredModalRef.open("Log-In Is Required to Answer This Question", this.router.url);
    }
  }
}
