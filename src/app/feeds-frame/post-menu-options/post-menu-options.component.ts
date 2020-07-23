import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'models/post-action.model';
import { FeedsService } from 'feeds-frame/feeds.service';
import { CommonService } from 'common/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SharePostComponent } from 'shared/components/dialogs/share-post/share-post.component';
import { LoginService } from 'auth/login.service';
import { PostFeedComponent } from '../post-feed/post-feed.component';
import { PostReportComponent } from 'feeds-frame/post-report/post-report.component';

@Component({
  selector: 'app-post-menu-options',
  templateUrl: './post-menu-options.component.html',
  styleUrls: ['./post-menu-options.component.scss']
})
export class PostMenuOptionsComponent implements OnInit {
  @Input() feed: Post;
  @Output() removePostEvent = new EventEmitter();
  @Output() postData = new EventEmitter();
  loggedInUserId: any;
  mobileView = false;
  screenWidth = window.innerWidth;
  constructor(private api: FeedsService,
    private commonService: CommonService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private login: LoginService) {
  }

  ngOnInit(): void {
    this.loggedInUserId = this.login.getUserProfile().id;
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
  }

  // openShareDialog() {
  //   this.api.getSharableLink(this.feed.postActionId).subscribe((res: any) => {
  //     this.dialog.open(SharePostComponent, {
  //       width: '500px',
  //       data: {url: res.clickAction}
  //     });
  //   });
  // }

  removePost(postId) {
    this.api.removePost(postId).subscribe((res: any) => {
      // console.log(res);
      this.snackBar.open('Post has been deleted', 'close', { duration: 5000 });
      this.removePostEvent.emit(postId);
    }, error => {
      // console.log(error.error.errorMessage);
    });
  }

  copyLinkOfPost() {
    const snackBarRef = this.snackBar.open('Copying Link..');
    this.api.getSharableLink(this.feed.postActionId).subscribe((res: any) => {
      this.commonService.copyToClipboard(res.clickAction);
      snackBarRef.dismiss();
    });
  }

  editPost(communityId, isCommunityPost, editing, feed): void {
    const dialogRef = this.dialog.open(PostFeedComponent, {
      width: '500px',
      // height: '600px',
      // backdropClass: 'custom-dialog-backdrop-class',
      // panelClass: 'custom-dialog-panel-class',
      // disableClose:true
      data: { communityId, isCommunityPost, editing, feed }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.data) {
        this.postData.emit(result.data);
      }
    });
  }
  openPostReportDialog() {
    let config = null;
    if (this.mobileView) {
      config = {
        width: '100%',
        maxWidth: '100vw'
      };
    } else {
      config = {
        width: '40vw'
      };
    }
    config.data = { postId: this.feed.postActionId };
    this.dialog.open(PostReportComponent, config);
  }
}
