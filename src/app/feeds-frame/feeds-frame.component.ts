import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FeedsService } from './feeds.service';
// import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-feeds-frame',
  templateUrl: './feeds-frame.component.html',
  styleUrls: ['./feeds-frame.component.scss', './sidenav/sidenav.component.scss']
})
export class FeedsFrameComponent implements OnInit {
  userFeeds = [];
  sideConfig = 'side';
  isSidenavopen = false;
  isMobile = false;
  communities = [
    { title: 'Music', src: 'assets/community/music.png', detail: 200, slug: 'music-3456790-976543' },
    { title: 'Business', src: 'assets/community/business.png', detail: 1200, slug: 'business-45678-09876' },
    { title: 'Health', src: 'assets/community/health.png', detail: 400, slug: 'health-9854-98765'},
    { title: 'Finance', src: 'assets/community/finance.png', detail: 300 , slug: 'finance-9654-95'},
    { title: 'Nature', src: 'assets/community/nature.png', detail: 550 , slug: 'nature-9765-98765'},
  ];
  constructor(private service: FeedsService) {
    if (window.screen.width <= 600) {
      this.sideConfig = 'over';
      this.isMobile = true;
    } else if (window.screen.width >= 1368) {
      this.isSidenavopen = false;
      this.sideConfig = 'side';
    } else if (window.screen.width >= 600 && window.screen.width <= 1368) {
      this.sideConfig = 'side';
      this.isSidenavopen = true;
      this.isMobile = true;
    }
  }

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
  postFeed(event) {
    const formData = new FormData();
    formData.append('text', event);
    this.service.postFeed(formData).subscribe(
      res => {
        console.log(res);
        this.getUserFeeds();
      }, err => { }
    );
  }

  ngOnInit(): void {
    this.getUserFeeds();
  }

  getUserFeeds() {
    this.service.getFeeds().subscribe(
      (res: any) => {
        console.log(res);
        if (res.content.length) {
          this.userFeeds = res.content;
        }
      }, err => { }
    );
  }

  toggle(_) {
    this.isSidenavopen = !this.isSidenavopen;
  }

}
