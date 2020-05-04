import { Component, OnInit, OnDestroy } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FeedsService } from './feeds.service';
import { ApiService } from 'shared/api.service';
import { MessagingService } from '../service/messaging.service';

@Component({
  selector: 'app-feeds-frame',
  templateUrl: './feeds-frame.component.html',
  styleUrls: ['./feeds-frame.component.scss', './sidenav/sidenav.component.scss']
})
export class FeedsFrameComponent implements OnInit, OnDestroy {
  userFeeds = [];
  page = 0;
  sideConfig = 'side';
  isSidenavopen = false;
  isMobile = false;
  // <<<<<<< HEAD
  //   communities = [
  //     { title: 'Music', src: 'assets/community/music.png', detail: 200, slug: 'music-3456790-976543' },
  //     { title: 'Business', src: 'assets/community/business.png', detail: 1200, slug: 'business-45678-09876' },
  //     { title: 'Health', src: 'assets/community/health.png', detail: 400, slug: 'health-9854-98765'},
  //     { title: 'Finance', src: 'assets/community/finance.png', detail: 300 , slug: 'finance-9654-95'},
  //     { title: 'Nature', src: 'assets/community/nature.png', detail: 550 , slug: 'nature-9765-98765'},
  //   ];
  //   constructor(private service: FeedsService) {
  //     if (window.screen.width <= 600) {
  //       this.sideConfig = 'over';
  //       this.isMobile = true;
  //     } else if (window.screen.width >= 1368) {
  //       this.isSidenavopen = false;
  //       this.sideConfig = 'side';
  //     } else if (window.screen.width >= 600 && window.screen.width <= 1368) {
  //       this.sideConfig = 'side';
  //       this.isSidenavopen = true;
  //       this.isMobile = true;
  //     }
  //   }
  //
  // =======
  loading = true;
  communities = [];
  trendingCommunities = [];
  suggestedCommunities = [];
  // >>>>>>> master
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

  constructor(private service: FeedsService, private api: ApiService, private messagingService: MessagingService) {
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

  postFeed(event) {
    this.getUserFeeds();
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
    this.getUserFeeds();
    this.getSuggestedCommunities();
    this.getTrendingCommunities();

    // Request notification permission
    this.messagingService.requestPermission();
  }
  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }
  scroll = (event): void => {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      this.loading = true;
      ++this.page;
      this.getUserFeeds();
    }
  }
  getUserFeeds() {
    this.loading = true;
    this.service.getFeeds(this.page).subscribe(
      (res: any) => {
        if (res.content.length) {
          console.log(res.content);
          res.content.forEach(post => {
            this.userFeeds.push(post);
          });
        }
        this.loading = false;
      }, err => { }
    );
  }

  getSuggestedCommunities() {
    this.api.getSuggestedCommunities().subscribe(
      (res: any) => {
        if (res.content.length) {
          this.suggestedCommunities = res.content.map(item => {
            item.title = item.communityName;
            item.src = item.avatarDTO.avatarLink;
            item.detail = item.totalMembers;
            return item;
          });
        }
      }, err => { }
    );
  }

  getTrendingCommunities() {
    this.api.getTrendingCommunities().subscribe(
      (res: any) => {
        if (res.content.length) {
          this.trendingCommunities = res.content.map(item => {
            item.title = item.communityName;
            item.src = item.avatarDTO.avatarLink;
            item.detail = item.totalMembers;
            return item;
          });
        }
      }, err => { }
    );
  }

  toggle(_) {
    this.isSidenavopen = !this.isSidenavopen;
  }

}
