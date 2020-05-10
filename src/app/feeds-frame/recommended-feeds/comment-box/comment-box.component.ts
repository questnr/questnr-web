import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FeedsService } from 'feeds-frame/feeds.service';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['../recommended-feeds.component.scss', './comment-box.component.scss'],
})
export class CommentBoxComponent {
  isLoading = false;
  isReplying = false;
  @Input() comment;
  @Input() postId;
  @Output() reply = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor(private api: FeedsService) { }

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
  replyTo(username, commentId) {
    this.reply.emit({ username, commentId });
  }

  likedComment() {
    this.isLoading = false;
    this.comment.commentActionMeta.liked = true;
  }
  dislikedComment() {
    this.isLoading = false;
    this.comment.commentActionMeta.liked = false;
  }
}
