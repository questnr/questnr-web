import { AfterViewInit, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'global.service';
import { CommunityListData, CommunityListMatCardType, CommunityListType } from 'models/community-list.model';
import { User } from 'models/user.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GlobalConstants } from 'shared/constants';
import { LoginService } from '../auth/login.service';
import { Community } from '../models/community.model';
import { ApiService } from '../shared/api.service';
import { CommunityListComponent } from '../shared/components/dialogs/community-list/community-list.component';
import { CommunityLoaderComponent } from './community-loader/community-loader.component';


@Component({
  selector: 'app-community-box',
  templateUrl: './community-box.component.html',
  styleUrls: ['./community-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommunityBoxComponent implements OnInit, AfterViewInit {
  communityList: Community[];
  userId: number;
  @Input() totalCommunityCount: number;
  @Input() user: User;
  @Input() templateStyle: CommunityListMatCardType = CommunityListMatCardType.simple;
  @Input() communityListType: CommunityListType;
  isOwner: boolean = false;
  communityBoxTitle: string;
  CommunityListMatCardTypeClass = CommunityListMatCardType;
  loadingCommunities = true;
  mobileView: boolean = false;
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
        items: 2
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
  communityLoaderRef: CommunityLoaderComponent;
  @ViewChild("communityLoader")
  set communityLoader(communityLoaderRef: CommunityLoaderComponent) {
    this.communityLoaderRef = communityLoaderRef;
  }

  constructor(public api: ApiService,
    public loginService: LoginService,
    public dialog: MatDialog,
    private _globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.loadingCommunities = true;
    this.mobileView = this._globalService.isMobileView();
    if (!this.templateStyle) {
      this.templateStyle = CommunityListMatCardType.simple;
    }
  }

  ngAfterViewInit(): void {
    if (this.communityListType == CommunityListType.joined) {
      this.communityBoxTitle = "Joined Communities";
    } else if (this.communityListType == CommunityListType.owned) {
      this.communityBoxTitle = "Owned Communities";
    }
  }

  startLoading(totalCommunityCount: number = 5) {
    this.totalCommunityCount = totalCommunityCount;
    this.communityLoaderRef?.setListItems(this.totalCommunityCount);
    this.loadingCommunities = true;
  }

  setData(isOwner: boolean, communityList: Community[]) {
    this.isOwner = isOwner;
    this.communityList = communityList;
    this.loadingCommunities = false;
  }

  stopLoading() {
    this.loadingCommunities = false;
  }

  openCommunityDialog(): void {
    let config = null;
    let communityListData: CommunityListData = new CommunityListData();
    communityListData.communityList = this.communityList;
    communityListData.type = this.communityListType;
    communityListData.isOwner = this.isOwner;
    communityListData.user = this.user;
    communityListData.userId = this.user?.userId;
    communityListData.page = 1;
    communityListData.isEnd = this.totalCommunityCount <= this.communityList?.length;
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
