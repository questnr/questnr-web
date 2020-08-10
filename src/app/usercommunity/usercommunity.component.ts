import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GlobalConstants } from 'shared/constants';
import { environment } from '../../environments/environment';
import { Community } from '../models/community.model';
import { CommunityListComponent } from '../shared/components/dialogs/community-list/community-list.component';
import { CreateCommunityComponent } from '../shared/components/dialogs/create-community/create-community.component';
import { UsercommunityService } from './usercommunity.service';
import { StaticMediaSrc } from 'shared/constants/static-media-src';

@Component({
  selector: 'app-usercommunity',
  templateUrl: './usercommunity.component.html',
  styleUrls: ['./usercommunity.component.scss']
})
export class UsercommunityComponent implements OnInit {

  constructor(public dialog: MatDialog, public http: HttpClient, public usercommunityService: UsercommunityService) {
  }
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
  screenWidth = window.innerWidth;
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

  ngOnInit() {
    setTimeout(() => {
      this.getUserOwnedCommunity();
    }, 2000);
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
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
  openCommunityDialog(community): void {
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
        data: { userId: this.userId, community, type: 'ownedCommunity' }
      };
    } else {
      config = {
        width: '700px',
        maxHeight: "70vh",
        data: { userId: this.userId, community, type: 'ownedCommunity' }
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
