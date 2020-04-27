import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FeedsService } from './feeds.service';
import { ApiService } from 'shared/api.service';

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
  loading = true;
  communities = [];
  trendingCommunities = [];
  suggestedCommunities = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
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
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    console.log('????????????????????????????');
    // visible height + pixel scrolled >= total height
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      console.log('End');
    }
  }

  constructor(private service: FeedsService, private api: ApiService) {
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
    window.addEventListener('scroll', this.scroll, true);
    this.getUserFeeds();
    this.getSuggestedCommunities();
    this.getTrendingCommunities();
  }
  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }
  scroll = (event): void => {
    console.log('scrolling.....');
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      this.loading = true;
      ++this.page;
      this.getUserFeeds();
    }
  };
  getUserFeeds() {
    this.service.getFeeds(this.page).subscribe(
      (res: any) => {
        if (res.content.length) {
          res.content.forEach(post => {
            this.userFeeds.push(post);
          });
        }
      }, err => { }
    );
  }

  getSuggestedCommunities() {
    this.api.getSuggestedCommunities().subscribe(
      (res: any) => {
        console.log(res);
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
        console.log(res);
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
