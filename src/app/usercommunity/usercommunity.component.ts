import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GlobalConstants } from 'shared/constants';
import { environment } from '../../environments/environment';
import { Community, CommunityListType } from '../models/community.model';
import { CommunityListComponent } from '../shared/components/dialogs/community-list/community-list.component';
import { CreateCommunityComponent } from '../shared/components/dialogs/create-community/create-community.component';
import { UsercommunityService } from './usercommunity.service';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { GlobalService } from 'global.service';

@Component({
  selector: 'app-usercommunity',
  templateUrl: './usercommunity.component.html',
  styleUrls: ['./usercommunity.component.scss']
})
export class UsercommunityComponent implements OnInit {
  @Input() profileUserId: number;
  @Input() userId: number;
  @Input() hasCommunity = true;
  @Input() defaultImage = StaticMediaSrc.communityFile;
  @Input() relation;
  @Input() ownsCommunities: number;
  communityPath: string = GlobalConstants.communityPath;
  baseUrl = environment.baseUrl;
  ownedCommunity: Community[];
  loader = true;
  mobileView = false;
  endOfResult = false;
  page = 0;
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
    setTimeout(() => {
      this.getUserOwnedCommunity();
    }, 2000);
    this.mobileView = this._globalService.isMobileView();
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
        data: { userId: this.userId, communityList, type: CommunityListType.owned, page: 1 }
      };
    } else {
      config = {
        width: '700px',
        maxHeight: "70vh",
        panelClass: 'community-list-modal',
        overflow: "hidden",
        data: { userId: this.userId, communityList, type: CommunityListType.owned, page: 1 }
      };
    }
    const dialogRef = this.dialog.open(CommunityListComponent, config);

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  getUserOwnedCommunity() {
    this.loader = true;
    if (!this.userId) return;
    this.usercommunityService.getUserOwnedCommunity(this.userId, this.page).subscribe((res: any) => {
      this.loader = false;
      this.ownedCommunity = res.content;
      // console.log(res.content);
    }, error => {
      this.loader = false;
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
