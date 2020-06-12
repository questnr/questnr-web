import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'models/post-action.model';
import { FeedsService } from 'feeds-frame/feeds.service';
import { CommonService } from 'common/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SharePostComponent } from 'shared/components/dialogs/share-post/share-post.component';
import { LoginService } from 'auth/login.service';

@Component({
  selector: 'app-post-menu-options',
  templateUrl: './post-menu-options.component.html',
  styleUrls: ['./post-menu-options.component.scss']
})
export class PostMenuOptionsComponent implements OnInit {
  @Input() feed: Post;
  @Output() removePostEvent = new EventEmitter();
  loggedInUserId: any;
  constructor(private api: FeedsService,
    private commonService: CommonService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private login: LoginService) { }

  ngOnInit(): void {
    this.loggedInUserId = this.login.getUserProfile().id;
  }

  openShareDialog() {
    this.api.getSharableLink(this.feed.postActionId).subscribe((res: any) => {
      this.dialog.open(SharePostComponent, {
        width: '500px',
        data: { url: res.clickAction }
      });
    });
  }

  removePost(postId) {
    this.api.removePost(postId).subscribe((res: any) => {
      // console.log(res);
      this.snackBar.open("Post has been deleted", 'close', { duration: 5000 });
      this.removePostEvent.emit(postId);
    }, error => {
      // console.log(error.error.errorMessage);
    });
  }

  copyLinkOfPost() {
    let snackBarRef = this.snackBar.open("Copying Link..");
    this.api.getSharableLink(this.feed.postActionId).subscribe((res: any) => {
      this.commonService.copyToClipboard(res.clickAction);
      snackBarRef.dismiss();
    });
  }

}
