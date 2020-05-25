import {Component, Input, OnInit} from '@angular/core';
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
  loader = false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: false,
    autoplay: true
  };
  @Input() type: any;
  loadingCommunities = true;
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
