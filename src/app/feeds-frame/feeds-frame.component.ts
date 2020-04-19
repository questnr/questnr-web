import { Component, OnInit } from '@angular/core';
// import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-feeds-frame',
  templateUrl: './feeds-frame.component.html',
  styleUrls: ['./feeds-frame.component.scss', './sidenav/sidenav.component.scss']
})
export class FeedsFrameComponent implements OnInit {

  sideConfig = 'side';
  isSidenavopen = false;
  communities = [
    { title: 'Music', src: 'assets/community/music.png', detail: 200 },
    { title: 'Business', src: 'assets/community/business.png', detail: 1200 },
    { title: 'Health', src: 'assets/community/health.png', detail: 400 },
    { title: 'Finance', src: 'assets/community/finance.png', detail: 300 },
    { title: 'Nature', src: 'assets/community/nature.png', detail: 550 },
    // { title: 'Technology', src: 'assets/community/technology.png', detail: 2300 },
    // { title: 'Beauty & Cosmetics', src: 'assets/community/beauty&cosmetics.png', detail: 300 },
    // { title: 'Corona', src: 'assets/community/corona.png', detail: 1350 },
    // { title: 'Fashion', src: 'assets/community/fashion.png', detail: 400 },
    // { title: 'Startup Community', src: 'assets/community/startup-community.png', detail: 530 }
  ];
  constructor() { }

  // customOptions: OwlOptions = {
  //   loop: false,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: true,
  //   dots: false,
  //   navSpeed: 700,
  //   navText: ['', ''],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 2
  //     },
  //     740: {
  //       items: 3
  //     },
  //     940: {
  //       items: 4
  //     }
  //   },
  //   nav: false,
  //   autoplay: true
  // };


  ngOnInit(): void {
    if (window.screen.width <= 600) {
      this.sideConfig = 'over';
    } else if (window.screen.width >= 1368) {
      this.isSidenavopen = false;
      this.sideConfig = 'side';
    } else if (window.screen.width >= 600 && window.screen.width <= 1368) {
      this.sideConfig = 'side';
      this.isSidenavopen = true;
    }
  }

  toggle(_) {
    this.isSidenavopen = !this.isSidenavopen;
  }

}
