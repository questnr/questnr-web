import { Component, OnInit, OnDestroy, HostListener, ViewChildren, QueryList, ViewChild, ElementRef } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FeedsService } from './feeds.service';
import { ApiService } from 'shared/api.service';
import { MessagingService } from '../service/messaging.service';
import { RecommendedFeedsComponent } from './recommended-feeds/recommended-feeds.component';
import { CreateCommunityComponent } from 'shared/components/dialogs/create-community/create-community.component';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConstants } from '../shared/constants';
import { Post } from 'models/post-action.model';
import { AskQuestionComponent } from '../shared/components/dialogs/ask-question/ask-question.component';
import { CommunitySuggestionGuideComponent } from 'community-suggestion-guide/community-suggestion-guide.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-feeds-frame',
  templateUrl: './feeds-frame.component.html',
  styleUrls: ['./feeds-frame.component.scss', './sidenav/sidenav.component.scss']
})
export class FeedsFrameComponent implements OnInit, OnDestroy {
  @ViewChildren(RecommendedFeedsComponent) recommendedFeedsComponent!: QueryList<RecommendedFeedsComponent>;
  userFeeds = [];
  pathLink = GlobalConstants.feedPath;
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
  state_: Observable<object>;
  screenWidth = window.innerWidth;
  @ViewChild("feedFrame") feedFrame: ElementRef;

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

  constructor(private service: FeedsService,
    private api: ApiService,
    private messagingService: MessagingService,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute) {
    this.state_ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state));
    this.state_.subscribe((res: any) => {
      if (res?.communitySuggestion) {
        setTimeout(() => {
          this.dialog.open(CommunitySuggestionGuideComponent, {
            disableClose: true,
            width: this.mobileView ? "90vw" : "60vw",
            data: {
              mobileView: this.mobileView
            }
          });
        }, 1000);
      }
    });
  }

  postFeed(event) {
    if (event.postActionId) {
      this.userFeeds = [event, ...this.userFeeds];
    } else {
      this.getUserFeeds();
    }
  }

  ngOnInit(): void {
    this.onresize();
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
    this.getUserFeeds();
    this.getSuggestedCommunities();
    this.getTrendingCommunities();

    // Request notification permission
    this.messagingService.requestPermission();
  }

  ngAfterViewInit(): void {
    // this.feedFrame.nativeElement.onscroll = this.onScroll;
    this.feedFrame.nativeElement.addEventListener('scroll', this.onScroll, true);
  }

  ngOnDestroy() {
    this.feedFrame.nativeElement.removeEventListener('scroll', this.onScroll, true);
  }

  onScroll = (event): void => {
    if (!this.scrollCached) {
      setTimeout(() => {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 300) {
          if (this.userFeeds.length > 1 && !this.endOfPosts) {
            if (!this.loading) {
              this.loading = true;
              this.getUserFeeds();
            }
          }
        }
        this.scrollCached = null;
      }, 100);
    }
    this.scrollCached = event;
  };

  getUserFeeds() {
    this.loading = true;
    this.service.getFeeds(this.page).subscribe(
      (res: any) => {
        if (res.content.length) {
          this.page++;
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
      }, err => {
      }
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

  createCommunity(): void {
    const dialogRef = this.dialog.open(CreateCommunityComponent, {
      maxWidth: this.mobileView ? "90vw" : "60vW",
      width: this.mobileView ? "90vw" : "60vW"
      // data: { desc : event.target.innerText}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  removePostNotify($event) {
    this.userFeeds = this.userFeeds.filter((post: Post) => {
      return post.postActionId !== $event;
    }
    );
  }
}
