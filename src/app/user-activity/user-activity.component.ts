import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'global.service';
import { CommunityListType, CommunityListData } from 'models/community-list.model';
import { UserListData, UserListType } from 'models/user-list.model';
import { User, UserInfo } from 'models/user.model';
import { CommunityListComponent } from 'shared/components/dialogs/community-list/community-list.component';
import { UserListComponent } from '../shared/components/dialogs/user-list/user-list.component';
import { UserFollowersService } from '../user-followers/user-followers.service';
import { UserActivityService } from './user-activity.service';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent implements OnInit {
  url: string;
  @Input() userInfo: UserInfo;
  mobileView = false;
  @Input() user: User;
  isLeftVisible: boolean = true;
  communityListTypeClass = CommunityListType;
  userListTypeClass = UserListType;

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

  openUserGroupDialog(type: UserListType): void {
    let config = null;
    let userListData: UserListData = new UserListData();
    userListData.user = this.user;
    userListData.type = type;
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
        panelClass: 'user-list-modal',
        overflow: "hidden",
        data: userListData
      };
    } else {
      config = {
        // width: '500px',
        maxWidth: "80vw",
        // data: userList,
        maxHeight: '70vh',
        panelClass: 'user-list-modal',
        overflow: "hidden",
        data: userListData
      };
    }
    const dialogRef = this.dialog.open(UserListComponent, config);

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  openCommunityDialog(communityListType: CommunityListType): void {
    let config = null;
    let communityListData: CommunityListData = new CommunityListData();
    communityListData.type = communityListType;
    communityListData.user = this.user;
    communityListData.userId = this.user.userId;
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
        panelClass: 'community-list-modal',
        overflow: "hidden",
        data: communityListData
      };
    } else {
      config = {
        width: '700px',
        maxHeight: "70vh",
        panelClass: 'community-list-modal',
        overflow: "hidden",
        data: communityListData
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
