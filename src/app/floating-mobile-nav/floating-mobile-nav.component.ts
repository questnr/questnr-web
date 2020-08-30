import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'models/page.model';
import { LoginService } from '../auth/login.service';
import { Community } from '../models/community.model';
import { ApiService } from '../shared/api.service';
import { CommunityListComponent } from '../shared/components/dialogs/community-list/community-list.component';
import { CreateCommunityComponent } from '../shared/components/dialogs/create-community/create-community.component';
import { GlobalConstants } from '../shared/constants';
import { UsercommunityService } from '../usercommunity/usercommunity.service';
import { CommunityListType, CommunityListData } from 'models/community-list.model';
import { GlobalService } from 'global.service';

@Component({
  selector: 'app-floating-mobile-nav',
  templateUrl: './floating-mobile-nav.component.html',
  styleUrls: ['./floating-mobile-nav.component.scss']
})
export class FloatingMobileNavComponent implements OnInit {
  @Input() url: string;
  links = GlobalConstants;
  home = false;
  explore = false;
  profile = false;
  profileLink: string;
  music = false;
  mobileView: boolean = false;
  ownedCommunity: Community[] = [];
  joinedCommunity: Community[] = [];
  communityPath = GlobalConstants.communityPath;
  isLeftVisible = false;
  communityListType = CommunityListType;

  constructor(public route: ActivatedRoute,
    public dialog: MatDialog,
    public loginService: LoginService,
    public usercommunityService: UsercommunityService,
    public api: ApiService,
    private _globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.profileLink = this.loginService.getUserProfile().slug;
    this.mobileView = this._globalService.isMobileView();
    if (this.url === this.links.feedPath) {
      this.home = true;
    } else if (this.url === this.links.explorePath) {
      this.explore = true;
    } else if (this.url === this.profileLink) {
      this.profile = true;
    } else if (this.url === 'youtube-music--7204285218705300364') {
      this.music = true;
    }
    this.getUserOwnedCommunity();
    this.getJoinedCommunity();
  }

  createCommunity(): void {
    const dialogRef = this.dialog.open(CreateCommunityComponent, {
      // width: '800px',
      maxWidth: this.mobileView ? "90vw" : "60vW",
      width: this.mobileView ? "90vw" : "60vW"
      // data: { desc : event.target.innerText}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  getUserOwnedCommunity() {
    if (!this.loginService.getUserProfile().id) return;
    this.usercommunityService.getUserOwnedCommunity(this.loginService.getUserProfile().id, 0)
      .subscribe((res: Page<Community>) => {
        if (res.content.length) {
          this.ownedCommunity = res.content;
        }
      }, error => {
        // console.log(error);
      });
  }
  getJoinedCommunity() {
    this.api.getJoinedCommunities(this.loginService.getUserProfile().id, 0).subscribe(
      (res: Page<Community>) => {
        if (res.content.length) {
          this.joinedCommunity = res.content;
        }
      }, err => {
      }
    );
  }

  openCommunityDialog(communityList: Community[], type: CommunityListType): void {
    let config = null;
    let communityListData: CommunityListData = new CommunityListData();
    communityListData.communityList = communityList;
    communityListData.type = type;
    communityListData.page = 1;
    communityListData.userId = this.loginService.getUserId();
    communityListData.isOwner = true;
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
    }
    const dialogRef = this.dialog.open(CommunityListComponent, config);

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
