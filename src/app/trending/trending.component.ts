import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GlobalConstants } from 'shared/constants';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Community } from 'models/community.model';
import { Page } from 'models/page.model';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  trendingCommunityList: Community[] = [];
  baseUrl = environment.baseUrl;
  loadingCommunities = false;
  listItems = Array(5);
  communityPath: string = GlobalConstants.communityPath;
  constructor(public http: HttpClient) { }

  ngOnInit(): void {
    this.getTrendingCommunityList();
  }
  getTrendingCommunityList() {
    this.loadingCommunities = true;
    this.http.get(this.baseUrl + 'community/trending-community-list').subscribe((res: Page<Community>) => {
      this.loadingCommunities = false;
      this.trendingCommunityList = res.content;
      // console.log(this.trendingCommunityList);
    }, error => {
      this.loadingCommunities = false;
    });
  }
}
