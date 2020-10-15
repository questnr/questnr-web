import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'auth/login.service';
import { CommonService } from 'common/common.service';
import { CommunityService } from 'community/community.service';
import { ConfirmDialogComponent } from 'confirm-dialog-modal/confirm-dialog/confirm-dialog.component';
import { FeedsService } from 'feeds-frame/feeds.service';
import { PostReportComponent } from 'feeds-frame/post-report/post-report.component';
import { Post, PostEditorType } from 'models/post-action.model';
import { UserProfileCardServiceComponent } from 'user-profile-card/user-profile-card-service.component';
import { PostFeedComponent } from '../post-feed/post-feed.component';

@Component({
  selector: 'app-post-menu-options',
  templateUrl: './post-menu-options.component.html',
  styleUrls: ['./post-menu-options.component.scss']
})
export class PostMenuOptionsComponent implements OnInit {
  @Input() feed: Post;
  @Input() isCommunityPost: boolean = false;
  @Output() removePostEvent = new EventEmitter();
  @Output() postData = new EventEmitter();
  loggedInUserId: any;
  mobileView = false;
  screenWidth = window.innerWidth;
  isBlog: boolean = false;

  constructor(private api: FeedsService,
    public commonService: CommonService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private login: LoginService,
    private userProfileCardService: UserProfileCardServiceComponent,
    private communityService: CommunityService) {
  }

  ngOnInit(): void {
    if (this.feed?.postData?.postEditorType) {
      this.isBlog = this.feed?.postData.postEditorType == PostEditorType.blog;
    }
    this.loggedInUserId = this.login.getLocalUserProfile().id;
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
    let dialogConfig;
    if (this.mobileView) {
      dialogConfig = {
        maxWidth: '95vw',
        width: '100%',
        data: {
          mobileView: this.mobileView
        }
      }
    } else {
      dialogConfig = {
        width: '550px',
        maxWidth: '80vw',
        data: {
          mobileView: this.mobileView
        }
      }
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result?.data) {
        this.api.removePost(postId).subscribe((res: any) => {
          // console.log(res);
          this.snackBar.open('Post has been deleted', 'close', { duration: 5000 });
          this.removePostEvent.emit(postId);
        }, error => {
          // console.log(error.error.errorMessage);
        });
      }
    });
  }

  copyLinkOfPost($event) {
    this.snackBar.open("Link copied to clipboard", 'close', { duration: 5000 });
    // const snackBarRef = this.snackBar.open('Copying Link..');
    // this.commonService.copyToClipboard(this.commonService.getPostSharableLink(this.feed.slug));
    // snackBarRef.dismiss();
    // this.api.getSharableLink(this.feed.postActionId).subscribe((res: any) => {
    //   this.commonService.copyToClipboard(res.clickAction);
    //   snackBarRef.dismiss();
    // });
  }

  editPost(communityId, isCommunityPost, editing, feed): void {
    const dialogRef = this.dialog.open(PostFeedComponent, {
      // width: '550px',
      // maxWidth: "90vw",
      maxWidth: "100vw",
      maxHeight: "100vh",
      // width: "90vw",
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

  showUnfollowBtn() {
    if (this.feed.communityDTO?.communityId) {
      return this.feed.communityDTO?.ownerUserDTO?.userId !== this.loggedInUserId;
    }
    return true;
  }

  unfollow() {
    let unfollowingName;
    if (this.isCommunityPost) {
      unfollowingName = this.feed.communityDTO.communityName;
    }
    else {
      unfollowingName = this.feed.userDTO.username;
    }
    let dialogConfig;
    let title = "Do you want to unfollow " + unfollowingName + "?";
    if (this.mobileView) {
      dialogConfig = {
        maxWidth: '100vw',
        width: '100%',
        data: {
          title,
          mobileView: this.mobileView
        }
      }
    } else {
      dialogConfig = {
        width: '550px',
        maxWidth: '80vw',
        data: {
          title,
          mobileView: this.mobileView
        }
      }
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result?.data) {
        const snackBarRef = this.snackBar.open('Unfollowing...');
        if (this.isCommunityPost) {
          this.communityService.unfollowCommunityService(this.feed.communityDTO.communityId, this.loggedInUserId).subscribe((res: any) => {
            snackBarRef.dismiss();
            this.snackBar.open("Unfollowed " + this.feed.communityDTO.communityName, 'close', { duration: 3000 });
          }, error => {
            snackBarRef.dismiss();
            this.snackBar.open(error.error.errorMessage, 'close', { duration: 3000 });
          });
        } else {
          this.userProfileCardService.unfollowMe(this.loggedInUserId, this.feed.userDTO.userId).subscribe((res: any) => {
            snackBarRef.dismiss();
            this.snackBar.open("Unfollowed " + this.feed.userDTO.username, 'close', { duration: 3000 });
          }, error => {
            snackBarRef.dismiss();
            this.snackBar.open(error.error.errorMessage, 'close', { duration: 3000 });
          });
        }
      }
    });
  }
}
