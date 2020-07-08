import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GlobalConstants } from 'shared/constants';
import { LoginService } from '../auth/login.service';
import { Community } from '../models/community.model';
import { ApiService } from '../shared/api.service';
import { CommunityListComponent } from '../shared/components/dialogs/community-list/community-list.component';

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
  screenWidth = window.innerWidth;
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

  constructor(public api: ApiService, public loginService: LoginService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadingCommunities = true;
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
    setTimeout(() => {
      let id = '';
      if (this.userId) {
        id = this.userId;
      } else {
        id = this.loginService.getUserId();
      }
      this.api.getJoinedCommunities(id, 0).subscribe(
        (res: any) => {
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
      return '/assets/default.jpg';
    }
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
        data: { userId: null, community, type: 'joinedCommunity' }
      };
    } else {
      config = {
        width: '700px',
        maxHeight: "70vh",
        data: { userId: null, community, type: 'joinedCommunity' }
      };
    }
    const dialogRef = this.dialog.open(CommunityListComponent, config);

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
