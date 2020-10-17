import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AttachedFileListComponent } from 'attached-file-list/attached-file-list.component';
import { LoginService } from 'auth/login.service';
import { FeedsService } from 'feeds-frame/feeds.service';
import { GlobalService } from 'global.service';
import { CommentAction, CommentParentClassType } from 'models/comment-action.model';
import { Page } from 'models/page.model';
import { Post } from 'models/post-action.model';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
  animations: [
    trigger('expand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CreateCommentComponent implements OnInit {
  @Input() feed: Post;
  @Input() parentType: CommentParentClassType = CommentParentClassType.feed;
  isCommentLoading: boolean;
  isCommenting: boolean = false;
  replyingTo: any;
  isReplying: boolean = false;
  commentInputRef: ElementRef;
  comment = new FormControl('', Validators.required);
  replyComment = new FormControl('', Validators.required);
  @ViewChild('commentInput')
  set commentInput(commentInputRef: ElementRef) {
    this.commentInputRef = commentInputRef;
  }
  @ViewChild('commentAttachFileInput')
  set commentAttachFileInput(commentAttachFileInputRef: any) {
    this.commentAttachFileInputRef = commentAttachFileInputRef;
  }
  commentAttachFileInputRef: ElementRef;
  @ViewChild('attachedFileListComponent') attachedFileListComponent: AttachedFileListComponent;
  attachedFileList = [];
  page: number = 0;
  endOfComments: boolean = false;
  mobileView: boolean = false;
  fontSize: string = "0.8rem";

  constructor(private feedsService: FeedsService,
    public login: LoginService,
    private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
    if (this.mobileView) {
      this.fontSize = "0.85rem";
    }
    if (this.parentType === CommentParentClassType.singlePost) {
      this.isCommenting = true;
    }
  }

  toggleComments() {
    this.isCommenting = !this.isCommenting;
  }
  getComments() {
    this.isCommentLoading = true;
    this.feedsService.getComments(this.feed.postActionId, this.page).subscribe(
      (res: Page<CommentAction>) => {
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

  postComment() {
    if (this.comment.value) {
      this.isCommentLoading = true;
      const formData = new FormData();
      formData.append('postId', String(this.feed.postActionId));
      formData.append('parentCommentId', this.replyingTo ? this.replyingTo.parentCommentId || this.replyingTo.commentId : 0);
      formData.append('commentObject', this.comment.value);
      if (this.attachedFileList.length > 0) {
        this.attachedFileList.forEach(attachedFile => {
          formData.append('files', attachedFile);
        });
      }
      if (this.comment.valid) {
        this.feedsService.postComment(this.feed.postActionId, formData).subscribe(
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
            ++this.feed.postActionMeta.totalComments;
            this.isCommentLoading = false;
            this.replyingTo = null;
            this.comment.setValue('');
            this.clearAttachedFileList();
          }, err => {
            this.isCommentLoading = false;
          }
        );
      }
    }
  }

  replyTo(event) {
    this.replyingTo = event;
    this.commentInputRef.nativeElement.focus();
  }

  removeReplying() {
    this.replyingTo = null;
    this.commentInputRef.nativeElement.focus();
  }

  openFileSelector() {
    this.commentAttachFileInputRef.nativeElement.click();
  }

  selectFiles(event) {
    if (event.target.files.length > 0) {
      this.filesDroppedOnComment(event.target.files);
    }
  }

  filesDroppedOnComment(droppedFiles) {
    this.attachedFileList = [];
    const files = Object.values(droppedFiles);
    files.forEach((file: any) => {
      if (file.type.includes('image') || file.type.includes('application')) {
        this.attachedFileList.push(file);
        this.showOnAttachedFileContainer(file);
      }
    });
  }

  showOnAttachedFileContainer(file) {
    this.attachedFileListComponent.pushFile(file);
  }

  finalizedAttachedFileListListener($event) {
    this.attachedFileList = $event;
  }

  clearAttachedFileList() {
    this.attachedFileList = [];
    this.attachedFileListComponent.clearAttachedFileList();
  }

  deleteComment($event) {
    this.feed.commentActionList = this.feed.commentActionList.filter((comment: CommentAction) =>
      $event !== comment.commentActionId
    );
  }
}
