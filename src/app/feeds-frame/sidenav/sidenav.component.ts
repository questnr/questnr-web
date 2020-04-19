import { Component, OnInit } from '@angular/core';
import { ApiService } from 'shared/api.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  userCommunities = [
    { title: 'Music', src: 'assets/community/music.png' },
    { title: 'Business', src: 'assets/community/business.png' },
    { title: 'Health', src: 'assets/community/health.png' },
    { title: 'Finance', src: 'assets/community/finance.png' },
    { title: 'Nature', src: 'assets/community/nature.png' },
  ];

  userHashtags = [
    { hashTagValue: 'starfish' },
    { hashTagValue: 'coldplay' },
    { hashTagValue: 'platform' },
    { hashTagValue: 'newguy' },
    { hashTagValue: 'likescomments' },
    { hashTagValue: 'community' },
  ];

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
          console.log(res);
          this.userHashtags = res.content;
          this.userHashtags = [...this.userHashtags].splice(0, 5);
        }
      }, err => { });
  }

}
