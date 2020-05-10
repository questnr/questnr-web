import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FeedsService } from 'feeds-frame/feeds.service';
import { FormControl } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['../recommended-feeds.component.scss', './comment-box.component.scss'],
  animations: [
    trigger('expand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CommentBoxComponent {
  isLoading = false;
  isReplying = false;
  @Input() comment;
  @Input() postId;
  @Output() update = new EventEmitter();
  reply = new FormControl();

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
  replyToComment(id) {
    this.isLoading = true;
    const data = {
      postId: this.postId,
      parentCommentId: id,
      commentObject: this.reply.value
    };
    this.api.postComment(id, data).subscribe(
      res => {
        this.isLoading = false;
        this.update.emit();
      }, err => {
        this.isLoading = false;
      }
    );
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
