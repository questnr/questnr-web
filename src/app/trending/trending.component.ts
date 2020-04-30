import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  trendingCommunityList = [];
  constructor(public http: HttpClient) { }
  baseUrl = environment.baseUrl;

  ngOnInit(): void {
    this.getTrendingCommunityList();
  }
  getTrendingCommunityList() {
    this.http.get(this.baseUrl + 'community/trending-community-list').subscribe((res: any) => {
      this.trendingCommunityList = res.content;
      console.log(this.trendingCommunityList);
    });
  }
}
