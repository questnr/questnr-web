import { Component, OnInit, OnDestroy, HostListener, ViewChildren, QueryList } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FeedsService } from './feeds.service';
import { ApiService } from 'shared/api.service';
import { MessagingService } from '../service/messaging.service';
import { RecommendedFeedsComponent } from './recommended-feeds/recommended-feeds.component';

@Component({
  selector: 'app-feeds-frame',
  templateUrl: './feeds-frame.component.html',
  styleUrls: ['./feeds-frame.component.scss', './sidenav/sidenav.component.scss']
})
export class FeedsFrameComponent implements OnInit, OnDestroy {
  @ViewChildren(RecommendedFeedsComponent) recommendedFeedsComponent!: QueryList<RecommendedFeedsComponent>;
  userFeeds = [];
  page = 0;
  sideConfig = 'side';
  isSidenavopen = false;
  mobileView = false;
  loading = true;
  endOfPosts = false;
  communities = [];
  trendingCommunities = [];
  trendingCommunitiesLoader = true;
  suggestedCommunities = [];
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
  scrollCached: boolean = null;

  screenWidth = window.innerWidth;

  @HostListener('window:resize', ['$event'])

  onresize(event: any = this.screenWidth) {
    const width = event.target ? event.target.innerWidth : event;
    if (width <= 800) {
      this.sideConfig = 'over';
      this.mobileView = true;
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
  }

  constructor(private service: FeedsService, private api: ApiService, private messagingService: MessagingService) { }

  postFeed(event) {
    if (event.postActionId) {
      this.userFeeds = [event, ...this.userFeeds];
    } else {
      this.getUserFeeds();
    }
  }

  ngOnInit(): void {
    this.onresize();
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
    if (!this.scrollCached) {
      setTimeout(() => {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
          if (this.userFeeds.length > 1 && !this.endOfPosts) {
            this.loading = true;
            ++this.page;
            this.getUserFeeds();
          }
        }
        this.scrollCached = null;
      }, 100);
    }
    this.scrollCached = event;
  }
  getUserFeeds() {
    this.loading = true;
    this.service.getFeeds(this.page).subscribe(
      (res: any) => {
        if (res.content.length) {
          res.content.forEach(post => {
            this.userFeeds.push(post);
          });
        } else {
          this.endOfPosts = true;
        }
        this.loading = false;
      }, err => {
        this.loading = false;
      }
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
    this.trendingCommunitiesLoader = true;
    this.api.getTrendingCommunities().subscribe(
      (res: any) => {
        this.trendingCommunitiesLoader = false;
        if (res.content.length) {
          this.trendingCommunities = res.content.map(item => {
            item.title = item.communityName;
            item.src = item.avatarDTO.avatarLink;
            item.detail = item.totalMembers;
            return item;
          });
        }
      }, err => {
        this.trendingCommunitiesLoader = false;
      }
    );
  }

  toggle(_) {
    this.isSidenavopen = !this.isSidenavopen;
  }

}
