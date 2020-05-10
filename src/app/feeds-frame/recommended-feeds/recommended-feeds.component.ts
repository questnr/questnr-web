import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { FeedsService } from 'feeds-frame/feeds.service';
import { LoginService } from 'auth/login.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SharePostComponent } from 'shared/components/dialogs/share-post/share-post.component';
import { MatDialog } from '@angular/material/dialog';
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
  @Input() feed;
  @ViewChild('commentInput') commentInput: ElementRef;
  isCommenting = false;
  replyingTo;
  isLoading = false;
  isCommentLoading = false;
  comment = new FormControl('', Validators.required);
  replyComment = new FormControl('', Validators.required);
  postLink;

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
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

  constructor(private api: FeedsService, public login: LoginService, private dialog: MatDialog) { }

  ngOnInit() {
  }
  toggleComments() {
    this.isCommenting = !this.isCommenting;
  }
  // getComments(postId) {
  //   this.api.getComments(postId).subscribe(
  //     (res: any) => {
  //       this.isCommentLoading = false;
  //       this.feed.commentActionDTOList = res.content;
  //     }
  //   );
  // }
  postComment(id) {
    if (this.comment.value) {
      this.isCommentLoading = true;
      const body = {
        postId: id,
        parentCommentId: this.replyingTo ? this.replyingTo.commentId : 0,
        commentObject: this.comment.value
      };
      if (this.comment.valid) {
        this.api.postComment(id, body).subscribe(
          res => {
            this.feed.commentActionList.push(res);
            this.isCommentLoading = false;
            this.replyingTo = null;
            this.comment.setValue('');
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
    const user = this.login.getUserProfile();
    return user.id;
  }
}
