import { Component, OnInit, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { FeedsService } from 'feeds-frame/feeds.service';
import { LoginService } from 'auth/login.service';

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
  ],
})
export class RecommendedFeedsComponent implements OnInit {
  @Input() feed;
  isCommenting = false;
  isLoading = false;
  isCommentLoading = false;
  isLiked = false;
  comment = new FormControl('', Validators.required);
  constructor(private api: FeedsService, private login: LoginService) { }

  ngOnInit() {
  }
  toggleComments(postId) {
    // this.getComments(postId);
    this.isCommenting = true;
  }
  getComments(postId) {
    console.log('getting comments');
    this.isCommentLoading = true;
    this.api.getComments(postId).subscribe(
      (res: any) => {
        this.isCommentLoading = false;
        this.feed.commentActionDTOList = res.content;
      }
    );
  }
  postComment(id) {
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
    this.api.likePost(id).subscribe(
      res => {
        this.isLoading = false;
        this.isLiked = true;
      }
    );
  }
  getUserId() {
    const user = this.login.getUserProfile();
    return user.id;
  }

  likeComment(id) {
    this.api.likeComment(id).subscribe(
      res => {
        this.isLoading = false;
        this.isLiked = true;
      }
    );
  }
  replyToComment() {

  }
}
