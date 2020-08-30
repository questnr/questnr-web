import { Component, Input, OnInit } from '@angular/core';
import { Community, CommunityListType } from '../models/community.model';
import { LoginService } from '../auth/login.service';
import { ApiService } from '../shared/api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalConstants } from 'shared/constants';
import { CommunityListComponent } from 'shared/components/dialogs/community-list/community-list.component';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { GlobalService } from 'global.service';
import { Page } from 'models/page.model';

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
        panelClass: 'community-list-modal',
        overflow: "hidden",
        data: { userId: this.loginService.getUserId(), community, type: CommunityListType.suggested, page: 1, isEnd: true }
      };
    } else {
      config = {
        width: '700px',
        maxHeight: "70vh",
        panelClass: 'community-list-modal',
        overflow: "hidden",
        data: { userId: this.loginService.getUserId(), community, type: CommunityListType.suggested, page: 1, isEnd: true }
      };
    }
    const dialogRef = this.dialog.open(CommunityListComponent, config);

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
