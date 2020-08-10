import { Component, Input, OnInit } from '@angular/core';
import { GlobalConstants } from '../shared/constants';
import { ActivatedRoute } from '@angular/router';
import { CreateCommunityComponent } from '../shared/components/dialogs/create-community/create-community.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../auth/login.service';
import { UsercommunityService } from '../usercommunity/usercommunity.service';
import { Community } from '../models/community.model';
import { ApiService } from '../shared/api.service';
import { CommunityListComponent } from '../shared/components/dialogs/community-list/community-list.component';

@Component({
  selector: 'app-floating-mobile-nav',
  templateUrl: './floating-mobile-nav.component.html',
  styleUrls: ['./floating-mobile-nav.component.scss']
})
export class FloatingMobileNavComponent implements OnInit {
  links = GlobalConstants;
  home = false;
  explore = false;
  profile = false;
  profileLink: string;
  music = false;
  mobileView = false;
  ownedCommunity: Community[] = [];
  joinedCommunity: Community[] = [];
  communityPath = GlobalConstants.communityPath;
  screenWidth = window.innerWidth;
  @Input() url: string;
  isLeftVisible = false;
  constructor(public route: ActivatedRoute, public dialog: MatDialog, public loginService: LoginService, public usercommunityService: UsercommunityService, public api: ApiService) {
  }

  ngOnInit(): void {
    this.profileLink = this.loginService.getUserProfile().slug;
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
      const el = document.querySelector('.flex-7');
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
    if (this.url === this.links.feedPath) {
      this.home = true;
    } else if (this.url === this.links.explorePath) {
      this.explore = true;
    } else if (this.url === this.profileLink) {
      this.profile = true;
    } else if (this.url === 'youtube-music--7204285218705300364') {
      this.music = true;
    }
    this.getUserOwnedCommunity();
    this.getJoinedCommunity();
  }

  createCommunity(): void {
    const dialogRef = this.dialog.open(CreateCommunityComponent, {
      // width: '800px',
      maxWidth: this.mobileView ? "90vw" : "60vW",
      width: this.mobileView ? "90vw" : "60vW"
      // data: { desc : event.target.innerText}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  getUserOwnedCommunity() {
    if (!this.loginService.getUserProfile().id) return;
    this.usercommunityService.getUserOwnedCommunity(this.loginService.getUserProfile().id, 0).subscribe((res: any) => {
      this.ownedCommunity = res.content;
    }, error => {
      // console.log(error);
    });
  }
  getJoinedCommunity() {
    this.api.getJoinedCommunities(this.loginService.getUserProfile().id, 0).subscribe(
      (res: any) => {
        if (res.content.length) {
          this.joinedCommunity = res.content;
        }
      }, err => {
      }
    );
  }

  openCommunityDialog(community, type): void {
    let config = null;
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
      data: { userId: null, community, type }
    }
    const dialogRef = this.dialog.open(CommunityListComponent, config);

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
