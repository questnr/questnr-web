import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GlobalConstants } from 'shared/constants';
import { LoginService } from '../auth/login.service';
import { Community, CommunityListType } from '../models/community.model';
import { ApiService } from '../shared/api.service';
import { CommunityListComponent } from '../shared/components/dialogs/community-list/community-list.component';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { GlobalService } from 'global.service';
import { Page } from 'models/page.model';

@Component({
  selector: 'app-joined-community',
  templateUrl: './joined-community.component.html',
  styleUrls: ['./joined-community.component.scss']
})
export class JoinedCommunityComponent implements OnInit {
  @Input() joinedCommunity: Community[];
  @Input() userId: any;
  @Input() followsCommunities: number;
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
    if (this.loginService.getUserId() === this.userId) {
      this.isOwner = true;
    }
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
        data: { userId: this.userId, communityList, type: CommunityListType.joined, page: 1 }
      };
    } else {
      config = {
        width: '700px',
        maxHeight: "70vh",
        data: { userId: this.userId, communityList, type: CommunityListType.joined, page: 1 }
      };
    }
    const dialogRef = this.dialog.open(CommunityListComponent, config);

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
