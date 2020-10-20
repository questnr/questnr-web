import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'global.service';
import { AvatarDTO } from 'models/common.model';
import { GlobalConstants } from 'shared/constants';
import { ProfileIconComponent } from 'shared/profile-icon/profile-icon.component';
import { LoginService } from '../../auth/login.service';
import { PostFeedComponent } from '../post-feed/post-feed.component';

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
  mobileView: boolean = true;
  userPath: string = GlobalConstants.userPath;
  profileIconRef: ProfileIconComponent;
  @ViewChild("profileIcon")
  set profileIcon(profileIconRef: ProfileIconComponent) {
    this.profileIconRef = profileIconRef;
  }

  constructor(public dialog: MatDialog,
    public login: LoginService,
    private _globalService: GlobalService) {
    this.login.avatarSubject.subscribe((avatar: AvatarDTO) => {
      // console.log("PROFILE FEEDS SUBJECT", avatar);
      this.profileIconRef.setAvatar(avatar);
    });
  }

  ngOnInit() {

  }
  ngAfterViewInit() {

    this.mobileView = this._globalService.isMobileView();
  }
  createPost(communityId, isCommunityPost, type, addMediaAction): void {
    const dialogRef = this.dialog.open(PostFeedComponent, {
      // maxWidth: this.mobileView ? "90vw" : "60vW",
      // width: this.mobileView ? "90vw" : "550px",
      maxWidth: "100vw",
      maxHeight: "100vh",
      // width: "90vw",
      // height: '600px',
      // backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'opened-modal',
      // disableClose:true
      data: { communityId, isCommunityPost, type, addMediaAction }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.data) {
        this.postData.emit(result.data);
      }
    });
  }
  emitQuestionData(event) {
    this.postData.emit(event.data);
  }
}
