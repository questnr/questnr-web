import { Component, OnInit, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { FeedsService } from 'feeds-frame/feeds.service';
import { LoginService } from 'auth/login.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

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
  isCommenting = false;
  isSharing = false;
  isReplying = false;
  isLoading = false;
  isCommentLoading = false;
  comment = new FormControl('', Validators.required);
  replyComment = new FormControl('', Validators.required);

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
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
    nav: false,
    autoplay: true
  };

  constructor(private api: FeedsService, private login: LoginService) { }

  ngOnInit() {
  }
  toggleComments() {
    this.isSharing = false;
    this.isCommenting = !this.isCommenting;
  }
  toggleSharing() {
    this.isCommenting = false;
    this.isSharing = !this.isSharing;
  }
  getComments(postId) {
    this.api.getComments(postId).subscribe(
      (res: any) => {
        this.isCommentLoading = false;
        this.feed.commentActionDTOList = res.content;
      }
    );
  }
  postComment(id) {
    this.isCommentLoading = true;
    const body = {
      postId: id,
      parentCommentId: 0,
      commentObject: this.comment.value
    };
    if (this.comment.valid) {
      this.api.postComment(id, body).subscribe(
        res => {
          this.getComments(id);
        }
      );
    }
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
