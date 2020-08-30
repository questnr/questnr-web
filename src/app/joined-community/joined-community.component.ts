import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'global.service';
import { CommunityListType, CommunityListData } from 'models/community-list.model';
import { Page } from 'models/page.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GlobalConstants } from 'shared/constants';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { LoginService } from '../auth/login.service';
import { Community } from '../models/community.model';
import { ApiService } from '../shared/api.service';
import { CommunityListComponent } from '../shared/components/dialogs/community-list/community-list.component';
import { User } from 'models/user.model';

@Component({
  selector: 'app-joined-community',
  templateUrl: './joined-community.component.html',
  styleUrls: ['./joined-community.component.scss']
})
export class JoinedCommunityComponent implements OnInit, AfterViewInit {
  @Input() followsCommunities: number;
  @Input() joinedCommunity: Community[];
  @Input() user: User;
  @Input() userId: number;
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
  isOwner: boolean = false;

  constructor(public api: ApiService,
    public loginService: LoginService,
    public dialog: MatDialog,
    private _globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.loadingCommunities = true;
    this.mobileView = this._globalService.isMobileView();
    if (!this.user) {
      this.userId = this.loginService.getUserId();
      this.isOwner = true;
    } else {
      this.userId = this.user.userId;
      if (this.loginService.getUserId() === this.user.userId) {
        this.isOwner = true;
      }
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.api.getJoinedCommunities(this.userId, 0).subscribe(
        (res: Page<Community>) => {
          this.loadingCommunities = false;
          if (res.content.length) {
            this.joinedCommunity = res.content;
          }
        }, err => {
          this.loadingCommunities = false;
        }
      );
    }, 2000);
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
    communityListData.type = CommunityListType.joined;
    if (this.isOwner) {
      communityListData.isOwner = this.isOwner;
    } else {
      communityListData.user = this.user;
    }
    communityListData.userId = this.userId;
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
