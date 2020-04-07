import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'shared/api.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss', '../home/home.component.scss'],
})

export class LandingPageComponent implements OnInit {
  activeAuth = 'login';

  communities = [
    { title: 'Music', src: 'assets/community/music.jpg', detail: 200 },
    { title: 'Business', src: 'assets/community/business.jpg', detail: 1200 },
    { title: 'Health', src: 'assets/community/health.jpg', detail: 400 },
    { title: 'Finance', src: 'assets/community/finance.jpg', detail: 300 },
    { title: 'Nature', src: 'assets/community/nature.jpg', detail: 550 },
    { title: 'Technology', src: 'assets/community/technology.jpg', detail: 2300 },
    // { title: 'Beauty & Cosmetics', src: 'assets/community/beauty.jpg', detail: 300 },
    { title: 'Transport', src: 'assets/community/transport.jpg', detail: 255 },
    { title: 'Agriculture', src: 'assets/community/agriculture.jpg', detail: 130 }
  ];

  @ViewChild('main', { static: true }) mainContent: ElementRef;

  users = [
    { username: 'user1', totalFollowers: 2, totalPosts: 2, userRank: 12 },
    { username: 'user2', totalFollowers: 12, totalPosts: 7, userRank: 10 },
    { username: 'user3', totalFollowers: 4, totalPosts: 4, userRank: 2 },
    { username: 'user4', totalFollowers: 6, totalPosts: 5, userRank: 4 },
    { username: 'user5', totalFollowers: 8, totalPosts: 15, userRank: 3 },
  ];

  hashtags = [
    { hashTagValue: 'starfish' },
    { hashTagValue: 'coldplay' },
    { hashTagValue: 'platform' },
    { hashTagValue: 'newguy' },
    { hashTagValue: 'likescomments' },
    { hashTagValue: 'community' },
  ];

  topHashtags = [];
  constructor(private api: ApiService) { }
  getImgSrc(user) {
    if (user && user.avatarDTO) {
      return user.avatarDTO.avatarLink ? user.avatarDTO.avatarLink : null;
    }
  }
  ngOnInit() {
    this.api.getTopUsers().subscribe(
      (res: any) => {
        if (res.content) {
          console.log(res);
          this.users = res.content;
        }
      }, err => { });
    this.api.getTopHashtags().subscribe(
      (res: any) => {
        if (res.content) {
          console.log(res);
          this.hashtags = res.content;
          this.topHashtags = [...this.hashtags].splice(0, 5);
        }
      }, err => { });
  }
  goTo(val: string) {
    this.activeAuth = val;
    this.mainContent.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
