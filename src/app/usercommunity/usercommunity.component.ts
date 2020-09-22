import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'global.service';
import { CommunityListData, CommunityListMatCardType, CommunityListType } from 'models/community-list.model';
import { User } from 'models/user.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GlobalConstants } from 'shared/constants';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { environment } from '../../environments/environment';
import { Community } from '../models/community.model';
import { CommunityListComponent } from '../shared/components/dialogs/community-list/community-list.component';
import { CreateCommunityComponent } from '../shared/components/dialogs/create-community/create-community.component';
import { UsercommunityService } from './usercommunity.service';

@Component({
  selector: 'app-usercommunity',
  templateUrl: './usercommunity.component.html',
  styleUrls: ['./usercommunity.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsercommunityComponent implements OnInit, AfterViewInit {
  @Input() profileUserId: number;
  @Input() user: User;
  @Input() hasCommunity = true;
  @Input() defaultImage = StaticMediaSrc.communityFile;
  // @Input() relation;
  @Input() ownsCommunities: number;
  @Input() templateStyle: CommunityListMatCardType = CommunityListMatCardType.simple;
  CommunityListMatCardTypeClass = CommunityListMatCardType;
  communityPath: string = GlobalConstants.communityPath;
  baseUrl = environment.baseUrl;
  ownedCommunity: Community[];
  loadingCommunities: boolean = true;
  mobileView: boolean = false;
  endOfResult = false;
  page: number = 0;
  listItems = Array(5);
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

  constructor(public dialog: MatDialog,
    public http: HttpClient,
    public usercommunityService: UsercommunityService,
    private _globalService: GlobalService) {
  }

  ngOnInit() {
    this.mobileView = this._globalService.isMobileView();
    if (!this.templateStyle) {
      this.templateStyle = CommunityListMatCardType.simple;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.getUserOwnedCommunity();
    }, 2000);
  }

  checkImageUrl(src) {
    if (src) {
      return src;
    } else {
      return StaticMediaSrc.communityFile;
    }
  }
  createCommunity(): void {
    const dialogRef = this.dialog.open(CreateCommunityComponent, {
      maxWidth: this.mobileView ? "90vw" : "60vW",
      width: this.mobileView ? "90vw" : "60vW"
      // width: '800px',
      // data: { desc : event.target.innerText}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.getUserOwnedCommunity();
      }
    });
  }
  openCommunityDialog(communityList): void {
    let config = null;
    let communityListData: CommunityListData = new CommunityListData();
    communityListData.communityList = communityList;
    communityListData.type = CommunityListType.owned;
    communityListData.userId = this.user.userId;
    communityListData.user = this.user;
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

  getUserOwnedCommunity() {
    this.loadingCommunities = true;
    if (!this.user?.userId) return;
    this.usercommunityService.getUserOwnedCommunity(this.user.userId, this.page).subscribe((res: any) => {
      this.loadingCommunities = false;
      this.ownedCommunity = res.content;
      // console.log(res.content);
    }, error => {
      this.loadingCommunities = false;
      // console.log(error);
    });
  }
  checkImageExists(src) {
    if (src) {
      return src;
    } else {
      return StaticMediaSrc.communityFile;
    }
  }
}
