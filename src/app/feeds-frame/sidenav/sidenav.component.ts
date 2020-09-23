import { Component, OnInit } from '@angular/core';
import { CommunityListMatCardType } from 'models/community-list.model';
import { User } from 'models/user.model';
import { ApiService } from 'shared/api.service';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { GlobalConstants } from '../../shared/constants';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  user: User;
  userHashtags = [];
  hashTagPath = GlobalConstants.hashTagPath;
  listItems = Array(5);
  loadingHashtags = true;
  CommunityListMatCardTypeClass = CommunityListMatCardType;

  siteTitle: string = GlobalConstants.siteTitle;
  copyRightRenewedYear = GlobalConstants.copyRightRenewedYear;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.getTopHashtags().subscribe(
      (res: any) => {
        this.loadingHashtags = false;
        if (res.content) {
          this.userHashtags = res.content;
          this.userHashtags = [...this.userHashtags].splice(0, 5);
        }
      }, err => { this.loadingHashtags = false; });
  }
  checkImageUrl(src) {
    if (src) {
      return src;
    } else {
      return StaticMediaSrc.userFile;
    }
  }
}
