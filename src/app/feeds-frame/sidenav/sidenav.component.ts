import { Component, OnInit } from '@angular/core';
import { ApiService } from 'shared/api.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  userCommunities = [];

  userHashtags = [];

  footerLinks = [
    { link: '', title: 'Home' },
    { link: '', title: 'Terms' },
    { link: '', title: 'Privacy Policy' },
  ];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getTopHashtags().subscribe(
      (res: any) => {
        if (res.content) {
          this.userHashtags = res.content;
          this.userHashtags = [...this.userHashtags].splice(0, 5);
        }
      }, err => { });
    this.api.getJoinedCommunities().subscribe(
      (res: any) => {
        if (res.content.length) {
          this.userCommunities = res.content.map(item => {
            item.title = item.communityName,
              item.src = item.avatarDTO.avatarLink;
            return item;
          });
        }
      }
    );
  }
}
