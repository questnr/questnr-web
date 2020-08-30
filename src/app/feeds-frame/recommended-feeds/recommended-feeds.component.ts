
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AttachedFileListComponent } from 'attached-file-list/attached-file-list.component';
import { LoginService } from 'auth/login.service';
import { CommonService } from 'common/common.service';
import { FeedTextComponent } from 'feed-text/feed-text.component';
import { FeedsService } from 'feeds-frame/feeds.service';
import { IFramelyService } from 'meta-card/iframely.service';
import { HashTag } from 'models/hashtag.model';
import { IFramelyData } from 'models/iframely.model';
import { Page } from 'models/page.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SharePostComponent } from 'shared/components/dialogs/share-post/share-post.component';
import { GlobalConstants } from 'shared/constants';
import { CommentAction } from '../../models/comment-action.model';
import { Post, PostActionForMedia, PostEditorType, PostMedia, ResourceType } from '../../models/post-action.model';
import { UserListComponent } from '../../shared/components/dialogs/user-list/user-list.component';
import { UserProfileCardServiceComponent } from '../../user-profile-card/user-profile-card-service.component';
import { UserListData, UserListType } from 'models/user-list.model';
declare var $: any;

@Component({
  selector: 'app-recommended-feeds',
  templateUrl: './recommended-feeds.component.html',
  styleUrls: ['./recommended-feeds.component.scss'],
  animations: [
    trigger('expand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class RecommendedFeedsComponent implements OnInit {
  @Input() feed: Post;
  commentInputRef: ElementRef;
  @ViewChild('commentInput')
  set commentInput(commentInputRef: ElementRef) {
    this.commentInputRef = commentInputRef;
  }
  @ViewChild('feedTextComponent') feedTextComponent: FeedTextComponent;
  @ViewChild('commentAttachFileInput')
  set commentAttachFileInput(commentAttachFileInputRef: any) {
    this.commentAttachFileInputRef = commentAttachFileInputRef;
  }
  commentAttachFileInputRef: ElementRef;
  @ViewChild('attachedFileListComponent') attachedFileListComponent: AttachedFileListComponent;
  @Output() removePostEvent = new EventEmitter();
  @Input() showUserHeader: boolean = false;
  // @ViewChild("metaCardComponentRef", { static: true }) metaCardComponentRef: MetaCardComponent;
  // @ViewChild(MetaCardComponent, { static: true }) set metaCard(metaCardComponentRef: MetaCardComponent) {
  //   if (!!metaCardComponentRef) {
  //     this.metaCardComponentRef = metaCardComponentRef;
  //   }
  // }
  iFramelyData: IFramelyData;
  isCommenting = false;
  replyingTo: any;
  isLoading = false;
  isSharing = false;
  isReplying = false;
  isCommentLoading = false;
  comment = new FormControl('', Validators.required);
  replyComment = new FormControl('', Validators.required);
  loggedInUsername: string;
  postLink;
  page = 1;
  endOfComments = false;
  screenWidth = window.innerWidth;
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
  attachedFileList = [];
  viewMediaList: PostMedia[] = [];
  applicationMediaList: PostMedia[] = [];
  @ViewChild("feedViewContainer") feedViewContainer: ElementRef;
  viewPortPassed: boolean = false;
  userListTypeClass = UserListType;

  constructor(private api: FeedsService,
    public login: LoginService,
    private dialog: MatDialog,
    public userProfileCardServiceComponent: UserProfileCardServiceComponent,
    private commonService: CommonService,
    private iFramelyService: IFramelyService,
    public snackbar: MatSnackBar,
    private router: Router,
    private _sanitizer: DomSanitizer) { }

  ngOnInit() {
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
    this.loggedInUsername = this.login.getUserProfile().sub;
    this.loggedInUserId = this.login.getUserProfile().id;
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
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
  }
  toggleComments() {
    this.isSharing = false;
    this.isCommenting = !this.isCommenting;
  }
  getComments() {
    this.isCommentLoading = true;
    this.api.getComments(this.feed.postActionId, this.page).subscribe(
      (res: Page<CommentAction>) => {
        this.isCommentLoading = false;
        if (res.content.length) {
          res.content.forEach(comment => {
            this.feed.commentActionList.push(comment);
          });
          ++this.page;
        } else {
          this.endOfComments = true;
        }
      }
    );
  }
  postComment(id) {
    if (this.comment.value) {
      this.isCommentLoading = true;
      const formData = new FormData();
      formData.append('postId', id);
      formData.append('parentCommentId', this.replyingTo ? this.replyingTo.parentCommentId || this.replyingTo.commentId : 0);
      formData.append('commentObject', this.comment.value);
      if (this.attachedFileList.length > 0) {
        this.attachedFileList.forEach(attachedFile => {
          formData.append('files', attachedFile);
        });
      }
      if (this.comment.valid) {
        this.api.postComment(id, formData).subscribe(
          (res: CommentAction) => {
            if (this.replyingTo && (this.replyingTo.parentCommentId || this.replyingTo.commentId)) {
              this.feed.commentActionList.forEach(c => {
                if (c.commentActionId === this.replyingTo.commentId || c.commentActionId === this.replyingTo.parentCommentId) {
                  if (!c.childCommentDTOSet) {
                    c.childCommentDTOSet = [];
                  }
                  c.childCommentDTOSet.unshift(res);
                }
              });
            } else {
              this.feed.commentActionList.unshift(res);
            }
            ++this.feed.postActionMeta.totalComments;
            this.isCommentLoading = false;
            this.replyingTo = null;
            this.comment.setValue('');
            this.clearAttachedFileList();
          }, err => {
            this.isCommentLoading = false;
          }
        );
      }
    }
  }

  replyTo(event) {
    this.replyingTo = event;
    this.commentInputRef.nativeElement.focus();
  }

  likePost(id) {
    this.isLoading = true;
    if (this.feed.postActionMeta.liked) {
      this.dislikedPost();
      this.api.dislikePost(id).subscribe(
        (res: any) => {
          if (res.status !== 200) { this.likedPost(); }
        }, err => { this.likedPost(); }
      );
    } else {
      this.likedPost();
      this.api.likePost(id).subscribe(
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

  deleteComment($event) {
    this.feed.commentActionList = this.feed.commentActionList.filter((comment: CommentAction) =>
      $event !== comment.commentActionId
    );
  }

  openShareDialog() {
    let clickAction = this.commonService.getPostSharableLink(this.feed.slug);
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
        this.router.createUrlTree(['/', this.postPath, this.feed.slug])
      );

      window.open(url, '_blank');
    }
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

  feedCameInView() {
    this.viewPortPassed = true;
    this.api.visitPost(this.feed.postActionId).subscribe();
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
