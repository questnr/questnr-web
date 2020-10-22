import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LoginService } from '../auth/login.service';
import { GlobalService } from '../global.service';
import { CommunityListData, CommunityListType } from '../models/community-list.model';
import { Community } from '../models/community.model';
import { Page } from '../models/page.model';
import { ApiService } from '../shared/api.service';
import { CommunityListComponent } from '../shared/components/dialogs/community-list/community-list.component';
import { GlobalConstants } from '../shared/constants';
import { StaticMediaSrc } from '../shared/constants/static-media-src';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {
  @Input() suggestedCommunityList: Community[];
  loadingCommunities = true;
  listItems = Array(5);
  mobileView = false;
  communityPath: string = GlobalConstants.communityPath;
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false,
    autoplay: true
  };
  constructor(public api: ApiService,
    public loginService: LoginService,
    public dialog: MatDialog,
    private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.api.getSuggestedCommunities().subscribe(
      (res: Page<Community>) => {
        this.loadingCommunities = false;
        if (res.content.length) {
          this.suggestedCommunityList = res.content;
        }
      }, err => { this.loadingCommunities = false; }
    );
    this.mobileView = this._globalService.isMobileView();
  }
  checkImageUrl(src) {
    if (src) {
      return src;
    } else {
      return StaticMediaSrc.communityFile;
    }
  }
  openCommunityDialog(communityList): void {
    let config = null;
    let communityListData: CommunityListData = new CommunityListData();
    communityListData.communityList = communityList;
    communityListData.type = CommunityListType.suggested;
    communityListData.isOwner = true;
    communityListData.userId = this.loginService.getUserId();
    communityListData.isEnd = true;
    communityListData.page = 1;
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
}
