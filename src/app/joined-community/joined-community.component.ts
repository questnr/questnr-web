import {Component, Input, OnInit} from '@angular/core';
import {Community} from '../models/community.model';
import {LoginService} from '../auth/login.service';
import {ApiService} from '../shared/api.service';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {CommunityListComponent} from '../shared/components/dialogs/community-list/community-list.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-joined-community',
  templateUrl: './joined-community.component.html',
  styleUrls: ['./joined-community.component.scss']
})
export class JoinedCommunityComponent implements OnInit {
  @Input() joinedCommunity: Community[];
  loadingCommunities = true;
  listItems = Array(5);
  screenWidth = window.innerWidth;
  mobileView = false;
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
  constructor(public api: ApiService, public loginService: LoginService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.api.getJoinedCommunities(this.loginService.getUserId(), 0).subscribe(
      (res: any) => {
        this.loadingCommunities = false;
        if (res.content.length) {
          this.joinedCommunity = res.content;
        }
      }, err => { this.loadingCommunities = false; }
    );

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
      return  '/assets/default.jpg';
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
        data: {userId: null, community, type: 'joinedCommunity'}
      };
    } else {
      config = {
        width: '700px',
        data: {userId: null, community, type: 'joinedCommunity'}
      };
    }
    const dialogRef = this.dialog.open(CommunityListComponent, config);

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
