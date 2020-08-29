import { Component, OnInit } from '@angular/core';
import { ApiService } from 'shared/api.service';
import { LoginService } from 'auth/login.service';
import { GlobalConstants } from '../../shared/constants';
import { StaticMediaSrc } from 'shared/constants/static-media-src';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  userCommunities = [];

  userHashtags = [];
  hashTagPath = GlobalConstants.hashTagPath;
  listItems = Array(5);
  loadingCommunities = true;
  loadingHashtags = true;

  siteTitle: string = GlobalConstants.siteTitle;
  copyRightRenewedYear = GlobalConstants.copyRightRenewedYear;

  constructor(private api: ApiService, private loginService: LoginService) { }

  ngOnInit() {
    this.api.getTopHashtags().subscribe(
      (res: any) => {
        this.loadingHashtags = false;
        if (res.content) {
          this.userHashtags = res.content;
          this.userHashtags = [...this.userHashtags].splice(0, 5);
        }
      }, err => { this.loadingHashtags = false; });

    this.api.getJoinedCommunities(this.loginService.getUserId(), 0).subscribe(
      (res: any) => {
        this.loadingCommunities = false;
        if (res.content.length) {
          this.userCommunities = res.content.map(item => {
            item.title = item.communityName,
              item.src = item.avatarDTO.avatarLink;
            return item;
          });
        }
      }, err => { this.loadingCommunities = false; }
    );
  }
  checkImageUrl(src) {
    if (src) {
      return src;
    } else {
      return StaticMediaSrc.userFile;
    }
  }
}
