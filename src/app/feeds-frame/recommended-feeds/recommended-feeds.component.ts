
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'auth/login.service';
import { CommonService } from 'common/common.service';
import { FeedsService } from 'feeds-frame/feeds.service';
import { IFramelyService } from 'meta-card/iframely.service';
import { HashTag } from 'models/hashtag.model';
import { IFramelyData } from 'models/iframely.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SharePostComponent } from 'shared/components/dialogs/share-post/share-post.component';
import { CommentAction } from '../../models/comment-action.model';
import { Post, PostActionForMedia } from '../../models/post-action.model';
import { UserListComponent } from '../../shared/components/dialogs/user-list/user-list.component';
import { UserProfileCardServiceComponent } from '../../user-profile-card/user-profile-card-service.component';
import { GlobalConstants } from 'shared/constants';
import { User } from 'models/user.model';
import { Page } from 'models/page.model';

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
  @ViewChild('commentInput') commentInput: ElementRef;
  // @ViewChild("metaCardComponentRef", { static: true }) metaCardComponentRef: MetaCardComponent;
  // @ViewChild(MetaCardComponent, { static: true }) set metaCard(metaCardComponentRef: MetaCardComponent) {
  //   if (!!metaCardComponentRef) {
  //     this.metaCardComponentRef = metaCardComponentRef;
  //   }
  // }
  iFramelyData: IFramelyData
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
    autoplay: true
  };
  loggedInUserId: any;
  hashTagsData: any = {};
  errorOnImageIndexList: number[] = [];
  userPath: string = GlobalConstants.userPath;

  constructor(private api: FeedsService,
    public login: LoginService,
    private dialog: MatDialog,
    public userProfileCardServiceComponent: UserProfileCardServiceComponent,
    private commonService: CommonService,
    private iFramelyService: IFramelyService) { }

  ngOnInit() {
    this.loggedInUsername = this.login.getUserProfile().sub;
    this.loggedInUserId = this.login.getUserProfile().id;
    this.parseFeed();
  }
  parseFeed() {
    this.feed.text.replace('\n', '<br>');
    this.feed.hashTags.forEach((hashTag: HashTag) => {
      // let hashTagNode = document.createElement("span");
      // hashTagNode.style.color = 'red';
      var regEx = new RegExp("#" + hashTag.hashTagValue, "ig");
      let index = this.commonService.indexOfUsingRegex(this.feed.text, regEx, 0);
      if (index >= 0)
        this.hashTagsData[index] = hashTag.hashTagValue.length + 1;
      this.feed.text = this.feed.text.replace(regEx,
        "<app-hash-tag hash-tag-value=\"" + hashTag.hashTagValue + "\"></app-hash-tag>"
      );
    });
  }
  async ngAfterViewInit() {
    if (this.feed.text) {
      let detectedLink: string = this.commonService.parseTextToFindURL(this.feed.text);
      this.iFramelyData = await this.iFramelyService.getIFramelyData(detectedLink);
    }
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
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
    this.api.getPostMediaList(this.feed.postActionId).subscribe((res: PostActionForMedia) => {
      this.feed.postMediaList = res.postMediaList;
      this.errorOnImageIndexList = [];
    });
  }
  toggleComments() {
    this.isSharing = false;
    this.isCommenting = !this.isCommenting;
  }
  getComments() {
    this.isCommentLoading = true;
    this.api.getComments(this.feed.postActionId, this.page).subscribe(
      (res: any) => {
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
      const body = {
        postId: id,
        parentCommentId: this.replyingTo ? this.replyingTo.parentCommentId || this.replyingTo.commentId : 0,
        commentObject: this.comment.value
      };
      if (this.comment.valid) {
        this.api.postComment(id, body).subscribe(
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
            ++this.feed.totalComments;
            this.isCommentLoading = false;
            this.replyingTo = null;
            this.comment.setValue('');
          }, err => {
            this.isCommentLoading = false;
          }
        );
      }
    }
  }

  replyTo(event) {
    this.replyingTo = event;
    this.commentInput.nativeElement.focus();
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
  openShareDialog() {
    this.api.getSharableLink(this.feed.postActionId).subscribe((res: any) => {
      this.dialog.open(SharePostComponent, {
        width: '500px',
        data: { url: res.clickAction }
      });
    });
  }
  likedPost() {
    this.isLoading = false;
    this.feed.postActionMeta.liked = true;
    ++this.feed.totalLikes;
  }
  dislikedPost() {
    this.isLoading = false;
    this.feed.postActionMeta.liked = false;
    --this.feed.totalLikes;
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
        data: { postId: this.feed.postActionId, type }
      };
    } else {
      config = {
        width: '500px',
        maxHeight: '70vh',
        // data: userList
        data: { postId: this.feed.postActionId, type }
      };
    }
    const dialogRef = this.dialog.open(UserListComponent, config);
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  removePost(postId) {
    this.api.removePost(postId).subscribe((res: any) => {
      // console.log(res);
    }, error => {
      // console.log(error.error.errorMessage);
    });
  }

  addEmoji(event) {
    // console.log(event);
    const text =  this.comment.value ? this.comment?.value : '';
    this.comment.setValue( text + event.native);
  }
}
