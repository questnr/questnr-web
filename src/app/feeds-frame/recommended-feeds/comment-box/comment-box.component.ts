import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FeedsService } from 'feeds-frame/feeds.service';
import { CommentAction } from 'models/comment-action.model';
import { Post } from 'models/post-action.model';
import { LoginService } from 'auth/login.service';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { GlobalConstants } from 'shared/constants';
import { GlobalService } from 'global.service';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss'],
})
export class CommentBoxComponent implements OnInit {
  isLoading = false;
  isReplying = false;
  @Input() comment: CommentAction;
  @Input() parentComment: CommentAction;
  @Input() post: Post;
  @Output() reply = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Input() fontSize: string;
  mobileView: boolean = false;
  loggedInUserId: any;
  defaultUserSrc: string = StaticMediaSrc.userFile;
  userPath: string = GlobalConstants.userPath;

  constructor(private api: FeedsService,
    public loginAuth: LoginService,
    private _globalService: GlobalService) {
    this.loggedInUserId = loginAuth.getLocalUserProfile().id;
  }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

  likeComment(id) {
    this.isLoading = true;
    if (this.comment.commentActionMeta.liked) {
      this.dislikedComment();
      this.api.dislikeComment(id).subscribe(
        (res: any) => {
          this.isLoading = false;
        }, err => { this.likedComment(); }
      );
    } else {
      this.likedComment();
      this.api.likeComment(id).subscribe(
        (res: any) => {
          if (res.likeCommentActionId) {
            return;
          } else { this.dislikedComment(); }
        }, err => { this.dislikedComment(); }
      );
    }
  }
  replyTo(username, commentId, parentCommentId) {
    this.reply.emit({ username, commentId, parentCommentId });
  }

  likedComment() {
    this.isLoading = false;
    this.comment.commentActionMeta.liked = true;
  }
  dislikedComment() {
    this.isLoading = false;
    this.comment.commentActionMeta.liked = false;
  }

  allowDelete() {
    return this.post.userDTO.userId == this.loggedInUserId || this.comment.userActorDTO.userId == this.loggedInUserId;
  }

  deleteComment() {
    this.api.deleteComment(this.post.postActionId, this.comment.commentActionId).subscribe((res: any) => {
      this.deleteEvent.emit(this.comment.commentActionId);
    });
  }
}
