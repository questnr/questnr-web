import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'auth/login.service';
import { FeedsService } from 'feeds-frame/feeds.service';
import { SinglePost } from 'models/signle-post.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UIService } from 'ui/ui.service';
import { SinglePostService } from './single-post.service';
import { SharePostComponent } from '../shared/components/dialogs/share-post/share-post.component';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConstants } from '../shared/constants';
import { IFramelyData } from '../models/iframely.model';
import { CommonService } from '../common/common.service';
import { IFramelyService } from '../meta-card/iframely.service';
import { HashTag } from '../models/hashtag.model';
import { CommentAction } from '../models/comment-action.model';
import { PostEditorType } from 'models/post-action.model';
enum postType {
  media, text, metacard
}
@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})

export class SinglePostComponent implements OnInit {
  iFramelyData: IFramelyData;
  userSlug = GlobalConstants.userPath;
  loginURL = GlobalConstants.login;
  replyingTo: any;
  fullscreen = false;
  page = 0;
  endOfComments = false;
  isCommenting = false;
  isSharing = false;
  isReplying = false;
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
  screenWidth = window.innerWidth;
  hashTagsData: any = {};
  // Thie will turn off "read more" functionality
  readMore: boolean = false;
  displayText: string;

  constructor(private api: FeedsService, private route: ActivatedRoute, private singlePostService: SinglePostService,
    public loginService: LoginService,
    public uiService: UIService,
    public dialog: MatDialog,
    private router: Router,
    private commonService: CommonService,
    private iFramelyService: IFramelyService) {
    this.postSlug = this.route.snapshot.paramMap.get('postSlug');
  }

  ngAfterViewInit() {

  }

  ngOnInit(): void {
    // console.log(this.loginService.getUserProfileImg());
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.route.data.subscribe((data: { singlePost: SinglePost }) => {
      this.singlePost = data.singlePost;
      console.log("this.singlePost", this.singlePost);
      if (this.singlePost.postMediaList.length) {
        this.viewType = postType.media;
      }
      this.parseFeed();
      this.isLoading = false;
    });
    // this.fetchPost(this.postSlug);
    // console.log(this.loginService.getUserProfileImg());
  }
  async parseFeed() {
    if (this.singlePost.postData.text)
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
      this.iFramelyData = await this.iFramelyService.getIFramelyData(detectedLink);
    }
  }

  checkPostViewType() {
    if (this.singlePost.postMediaList.length) {
      this.viewType = postType.media;
    } else {
      if (this.iFramelyData && !this.iFramelyData.error) {
        this.viewType = postType.metacard;
      } else {
        this.viewType = postType.text;
      }
    }
  }

  ngOnDestroy() {
    this.uiService.resetTitle();
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

  toggleComments() {
    this.isSharing = false;
    this.isCommenting = !this.isCommenting;
  }

  toggleSharing() {
    this.isCommenting = false;
    this.isSharing = !this.isSharing;
  }

  // getComments() {
  //   this.singlePostService.getPublicComments(this.postSlug).subscribe(
  //     (res: any) => {
  //       this.isCommentLoading = false;
  //       this.singlePost.commentActionList = res.content;
  //       const left = document.getElementById('post-media-window').style.height;
  //       const right = document.getElementById('post-head').style.height;
  //       if (left > right) {
  //         // console.log('left', left);
  //         document.getElementById('rightdiv').style.height = left;
  //       } else {
  //         // console.log('right', right);
  //         document.getElementById('leftdiv').style.height = right;
  //       }
  //     }
  //   );
  // }
  getComments() {
    this.isCommentLoading = true;
    this.api.getComments(this.singlePost.postActionId, this.page).subscribe(
      (res: any) => {
        this.isCommentLoading = false;
        if (res.content.length) {
          res.content.forEach(comment => {
            this.singlePost.commentActionList.push(comment);
          });
          ++this.page;
        } else {
          this.endOfComments = true;
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
        (res: any) => {
          this.isCommentLoading = false;
          if (res) {
            this.singlePost.commentActionList.push(res);
            this.comment.setValue('');
          }
          this.isCommenting = false;
          this.isCommentLoading = false;
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

  getUserId() {
    return this.loginService.getUserId();
  }

  addEmoji(event) {
    // console.log(event);
    const text = this.comment.value ? this.comment?.value : '';
    this.comment.setValue(text + event.native);
  }

  openShareDialog() {
    this.api.getSharableLink(this.singlePost.postActionId).subscribe((res: any) => {
      this.dialog.open(SharePostComponent, {
        width: '500px',
        data: { url: res.clickAction }
      });
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
}
