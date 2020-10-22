import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../global.service';
import { CommunityProfileMeta, Community, CommunityActivityPositionType } from '../models/community.model';
import { UserListComponent } from '../shared/components/dialogs/user-list/user-list.component';
import { UserFollowersService } from '../user-followers/user-followers.service';
import { CommunityActivityService } from './community-activity.service';
import { UserListData, UserListType } from '../models/user-list.model';

@Component({
  selector: 'app-community-activity',
  templateUrl: './community-activity.component.html',
  styleUrls: ['./community-activity.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommunityActivityComponent implements OnInit {
  @Input() community: Community;
  @Input() communityInfo: CommunityProfileMeta;
  @Input() actAlone: boolean = true;
  @Input() positioning: CommunityActivityPositionType = CommunityActivityPositionType.communityPage;
  communityActivityPositionTypeClass = CommunityActivityPositionType;
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
    if (!this.communityInfo && this.actAlone)
      this.getCommunityInfo();
    else
      this.loading = true;
  }

  setCommunity(community: Community) {
    this.community = community;
  }

  setCommunityInfo(communityInfo: CommunityProfileMeta) {
    if (!this.actAlone) {
      this.communityInfo = communityInfo;
      this.loading = false;
    }
  }

  getCommunityInfo() {
    // console.log('entered');
    this.loading = true;
    this._communityActivityService.getCommunityMetaInfo(this.community?.slug).subscribe((res: CommunityProfileMeta) => {
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
