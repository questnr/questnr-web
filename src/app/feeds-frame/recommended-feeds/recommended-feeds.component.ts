
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { FeedsService } from 'feeds-frame/feeds.service';
import { LoginService } from 'auth/login.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Post } from '../../models/post-action.model';
import { SharePostComponent } from 'shared/components/dialogs/share-post/share-post.component';
import { MatDialog } from '@angular/material/dialog';
import { CommentAction } from '../../models/comment-action.model';
import { HashTag } from 'models/hashtag.model';
import { MetaCardComponent } from 'meta-card/meta-card.component';
import { UserProfileCardServiceComponent } from '../../user-profile-card/user-profile-card-service.component';
import { UserListComponent } from '../../shared/components/dialogs/user-list/user-list.component';
import { CommonService } from 'common/common.service';
import { IFramelyService } from 'meta-card/iframely.service';
import { IFramelyData } from 'models/iframely.model';

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
    this.feed.hashTags.forEach((hashTag: HashTag) => {
      // let hashTagNode = document.createElement("span");
      // hashTagNode.style.color = 'red';
      var regEx = new RegExp("#" + hashTag.hashTagValue, "ig");
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
        res => {
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
      console.log(res);
    }, error => {
      console.log(error.error.errorMessage);
    });
  }
  openUserGroupDialog(userList, type): void {
    const dialogRef = this.dialog.open(UserListComponent, {
      width: '500px',
      data: userList
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
