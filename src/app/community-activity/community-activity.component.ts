import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'global.service';
import { CommunityProfileMeta, Community } from 'models/community.model';
import { UserListComponent } from '../shared/components/dialogs/user-list/user-list.component';
import { UserFollowersService } from '../user-followers/user-followers.service';
import { CommunityActivityService } from './community-activity.service';
import { UserListData, UserListType } from 'models/user-list.model';

@Component({
  selector: 'app-community-activity',
  templateUrl: './community-activity.component.html',
  styleUrls: ['./community-activity.component.scss']
})
export class CommunityActivityComponent implements OnInit {
  @Input() community: Community;
  @Input() communityInfo: CommunityProfileMeta;
  communitySlug: string;
  mobileView = false;
  isLeftVisible: boolean = true;
  loading: boolean = false;

  constructor(public route: ActivatedRoute,
    public _communityActivityService: CommunityActivityService,
    public dialog: MatDialog,
    public followersService: UserFollowersService,
    private _globalService: GlobalService) {
    this.mobileView = this._globalService.isMobileView();
  }

  ngOnInit(): void {
    this.communitySlug = this.community.slug;
    if (!this.communityInfo)
      this.getCommunityInfo();
  }

  getCommunityInfo() {
    // console.log('entered');
    this.loading = true;
    this._communityActivityService.getCommunityMetaInfo(this.communitySlug).subscribe((res: CommunityProfileMeta) => {
      this.loading = false;
      this.communityInfo = res;
      // console.log("communityInfo", res);
    }, error => {
      // console.log(error.error.errorMessage);
    });
  }

  openCommunityMembersDialog(): void {
    let config = null;
    let userListData: UserListData = new UserListData();
    userListData.community = this.community;
    userListData.type = UserListType.members;
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

  scrollTo() {
    document.querySelector('#community-feed').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
