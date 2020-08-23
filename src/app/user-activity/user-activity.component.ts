import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserActivityService } from './user-activity.service';
import { UserListComponent } from '../shared/components/dialogs/user-list/user-list.component';
import { MatDialog } from '@angular/material/dialog';
import { UserFollowersService } from '../user-followers/user-followers.service';
import { UserInfo } from 'models/user.model';
import { GlobalService } from 'global.service';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent implements OnInit {
  url: string;
  @Input() userInfo: UserInfo;
  mobileView = false;
  @Input() userId: any;
  shouldFetch: boolean = false;
  isLeftVisible: boolean = true;

  constructor(public route: ActivatedRoute,
    public userActivityService: UserActivityService,
    public dialog: MatDialog,
    public followersService: UserFollowersService,
    private _globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.url = this.route.snapshot.paramMap.get('userSlug');
    this.getUserInfo();
    this.mobileView = this._globalService.isMobileView();
  }

  getUserInfo() {
    if (!this.shouldFetch) return;
    // console.log('entered');
    this.userActivityService.getUserInfo(this.url).subscribe((res: UserInfo) => {
      this.userInfo = res;
      // console.log(res);
    }, error => {
      // console.log(error.error.errorMessage);
    });
  }

  openUserGroupDialog(userId, type): void {
    let config = null;
    if (this.mobileView) {
      config = {
        position: {
          top: '0',
          right: '0'
        },
        height: '100%',
        borderRadius: '0px',
        width: '100%',
        maxWidth: '100vw',
        marginTop: '0px',
        marginRight: '0px !important',
        panelClass: 'full-screen-modal',
        data: { userId, type }
      };
    } else {
      config = {
        // width: '500px',
        maxWidth: "80vw",
        // data: userList,
        maxHeight: "60vh",
        overflow: "hidden",
        data: { userId: this.userId, type }
      };
    }
    const dialogRef = this.dialog.open(UserListComponent, config);

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  // getFollowers() {
  //   // console.log('test userId', this.profileId);
  //   this.followersService.getUserFollowers(this.userId).subscribe((res: any) => {
  //     // console.log('follower content' + res.content);
  //     // this.followers = res.content;
  //     // this.openUserGroupDialog(res.content);
  //   }, error => {
  //     console.log(error.error.errorMessage);
  //   });
  // }
  //
  // getFollowingUser() {
  //   this.followersService.getFollowedBy(this.userId).subscribe((res: any) => {
  //     // console.log('followed content' + res.content);
  //     // this.following = res.content;
  //     // this.openUserGroupDialog(res.content);
  //   }, error => {
  //     console.log(error.error.errorMessage);
  //   });
  // }
  scrollTo() {
    document.querySelector('#user-feed').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
