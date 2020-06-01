import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'auth/login.service';
import { FeedsService } from 'feeds-frame/feeds.service';
import { SinglePost } from 'models/signle-post.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UIService } from 'ui/ui.service';
import { SinglePostService } from './single-post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  isCommenting = false;
  isSharing = false;
  isReplying = false;
  isLoading = true;
  isCommentLoading = false;
  comment = new FormControl('', Validators.required);
  replyComment = new FormControl('', Validators.required);

  postSlug: string;
  singlePost: SinglePost;
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

  constructor(private api: FeedsService, private route: ActivatedRoute, private singlePostService: SinglePostService,
    private loginService: LoginService,
    private uiService: UIService) {
    this.postSlug = this.route.snapshot.paramMap.get('postSlug');
  }

  ngOnInit(): void {
    this.fetchPost(this.postSlug);
  }

  ngOnDestroy() {
    this.uiService.resetTitle();
  }

  fetchPost(postSlug: string) {
    this.singlePostService.getSinglePost(postSlug).subscribe((singlePost: SinglePost) => {
      this.uiService.setMetaTagsAndTitle("Post", singlePost.metaList);
      this.singlePost = singlePost;
      this.isLoading = false;
    });
  }

  toggleComments() {
    this.isSharing = false;
    this.isCommenting = !this.isCommenting;
  }
  toggleSharing() {
    this.isCommenting = false;
    this.isSharing = !this.isSharing;
  }
  getComments() {
    this.singlePostService.getPublicComments(this.postSlug).subscribe(
      (res: any) => {
        this.isCommentLoading = false;
        this.singlePost.commentActionList = res.content;
        const left = document.getElementById('post-media-window').style.height;
        const right = document.getElementById('post-head').style.height;
        if (left > right) {
          // console.log('left', left);
          document.getElementById('rightdiv').style.height = left;
        } else {
          // console.log('right', right);
          document.getElementById('leftdiv').style.height = right;
        }
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
          this.getComments();
        }
      );
    }
  }
  likePost(id) {
    this.isLoading = true;
    if (this.singlePost.postActionMeta.liked) {
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
    this.singlePost.postActionMeta.liked = true;
    ++this.singlePost.totalLikes;
  }
  dislikedPost() {
    this.isLoading = false;
    this.singlePost.postActionMeta.liked = false;
    --this.singlePost.totalLikes;
  }
  getUserId() {
    return this.loginService.getUserId();
  }
}
