import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserActivityService } from './user-activity.service';
import { UserListComponent } from '../shared/components/dialogs/user-list/user-list.component';
import { MatDialog } from '@angular/material/dialog';
import { UserFollowersService } from '../user-followers/user-followers.service';
import { UserInfo } from 'models/user.model';
import { GlobalService } from 'global.service';
import { CommunityListType } from 'models/community.model';
import { CommunityListComponent } from 'shared/components/dialogs/community-list/community-list.component';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent implements OnInit {
  url: string;
  @Input() userInfo: UserInfo;
  mobileView = false;
  @Input() userId: number;
  isLeftVisible: boolean = true;
  communityListType = CommunityListType;

  constructor(public route: ActivatedRoute,
    public userActivityService: UserActivityService,
    public dialog: MatDialog,
    public followersService: UserFollowersService,
    private _globalService: GlobalService) {
    this.mobileView = this._globalService.isMobileView();
  }

  ngOnInit(): void {
    this.url = this.route.snapshot.paramMap.get('userSlug');
    if (!this.userInfo)
      this.getUserInfo();
  }

  getUserInfo() {
    // console.log('entered');
    this.userActivityService.getUserInfo(this.url).subscribe((res: UserInfo) => {
      this.userInfo = res;
      // console.log(res);
    }, error => {
      // console.log(error.error.errorMessage);
    });
  }

  openUserGroupDialog(type): void {
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
        data: { userId: this.userId, type }
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
  openCommunityDialog(communityListType: CommunityListType): void {
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
        data: { userId: this.userId, type: communityListType }
      };
    } else {
      config = {
        width: '700px',
        maxHeight: "70vh",
        data: { userId: this.userId, type: communityListType }
      };
    }
    const dialogRef = this.dialog.open(CommunityListComponent, config);

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  scrollTo() {
    document.querySelector('#user-feed').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
