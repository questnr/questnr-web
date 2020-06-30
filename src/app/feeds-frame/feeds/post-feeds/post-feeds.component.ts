import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostFeedComponent} from '../../post-feed/post-feed.component';
import {MatDialog} from '@angular/material/dialog';
import {LoginService} from '../../../auth/login.service';

@Component({
  selector: 'app-post-feeds',
  templateUrl: './post-feeds.component.html',
  styleUrls: ['./post-feeds.component.scss']
})
export class PostFeedsComponent implements OnInit {
  @Output() postData = new EventEmitter();
  @Input() isCommunityPost = false;
  @Input() communityId;
  @Input() type: any;
  constructor(public dialog: MatDialog, public  login: LoginService) { }

  ngOnInit() {
  }
  createPost(communityId, isCommunityPost, type, addMediaAction): void {
    const dialogRef = this.dialog.open(PostFeedComponent, {
      width: '500px',
      // height: '600px',
      // backdropClass: 'custom-dialog-backdrop-class',
      // panelClass: 'custom-dialog-panel-class',
      // disableClose:true
      data: {communityId, isCommunityPost, type, addMediaAction }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.data) {
        this.postData.emit(result.data);
      }
    });
  }
  emitQuestionData(event) {
    console.log('event', event);
    this.postData.emit(event.data);
  }
}
