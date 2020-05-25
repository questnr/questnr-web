import {Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  trendingCommunityList = [];
  constructor(public http: HttpClient) { }
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

  ngOnInit(): void {
    this.getTrendingCommunityList();
  }
  getTrendingCommunityList() {
    this.loader = true;
    this.http.get(this.baseUrl + 'community/trending-community-list').subscribe((res: any) => {
      this.loader = false;
      this.trendingCommunityList = res.content;
      // console.log(this.trendingCommunityList);
    }, error => {
      this.loader = false;
    });
  }
}
