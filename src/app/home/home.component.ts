import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'qnr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  activeAuth = 'login';
  @ViewChild('main', { static: true }) mainContent: ElementRef;

  constructor(private api: ApiService) { }

  communities = [1, 2, 3, 4, 5];
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
        }
      }, err => { });
  }
  gotTo(val: string) {
    this.activeAuth = val;
    this.mainContent.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
