import {Component, Input, OnInit} from '@angular/core';
import {GlobalConstants} from '../shared/constants';
import {ActivatedRoute} from '@angular/router';
import {CreateCommunityComponent} from '../shared/components/dialogs/create.community/create-community.component';
import {MatDialog} from '@angular/material/dialog';
import {LoginService} from '../auth/login.service';

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
  screenWidth = window.innerWidth;
  @Input() url: string;

  constructor(public route: ActivatedRoute, public dialog: MatDialog, public loginService: LoginService) {
  }

  ngOnInit(): void {
    this.profileLink = this.loginService.getUserProfile().slug;
    console.log(this.loginService.getUserProfile());
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
  }

  createCommunity(): void {
    const dialogRef = this.dialog.open(CreateCommunityComponent, {
      width: '800px',
      // data: { desc : event.target.innerText}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
