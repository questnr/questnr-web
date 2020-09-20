import { ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CommunitySuggestionGuideComponent } from 'community-suggestion-guide/community-suggestion-guide.component';
import { GlobalService } from 'global.service';
import { NotificationPurposeType, NotificationType, PostNotificationType, PushNotificationDTO } from 'models/notification.model';
import { Post, QuestionParentType } from 'models/post-action.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'shared/api.service';
import { CreateCommunityComponent } from 'shared/components/dialogs/create-community/create-community.component';
import { PostNotificationContainerComponent } from 'shared/post-notification-container/post-notification-container.component';
import { MessagingService } from '../service/messaging.service';
import { GlobalConstants } from '../shared/constants';
import { FeedsService } from './feeds.service';
import { RecommendedFeedsComponent } from './recommended-feeds/recommended-feeds.component';

@Component({
  selector: 'app-feeds-frame',
  templateUrl: './feeds-frame.component.html',
  styleUrls: ['./feeds-frame.component.scss', './sidenav/sidenav.component.scss']
})
export class FeedsFrameComponent implements OnInit, OnDestroy {
  @ViewChildren(RecommendedFeedsComponent) recommendedFeedsComponentList!: QueryList<RecommendedFeedsComponent>;
  userFeeds = [];
  pathLink = GlobalConstants.feedPath;
  page = 0;
  sideConfig = 'side';
  isSidenavopen = false;
  mobileView: boolean = false;
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
  questionParentTypeClass = QuestionParentType;
  feedNotificationRef: PostNotificationContainerComponent;
  @ViewChild("feedNotification")
  set feedNotification(feedNotificationRef: PostNotificationContainerComponent) {
    this.feedNotificationRef = feedNotificationRef;
    this.feedNotificationRef.setPostNotificationType(PostNotificationType.feed);
  }

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
    public activatedRoute: ActivatedRoute,
    private _glboalService: GlobalService,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef) {
    this.mobileView = this._glboalService.isMobileView();
    this.state_ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state));
    this.state_.subscribe((res: any) => {
      if (res?.communitySuggestion) {
        setTimeout(() => {
          this.dialog.open(CommunitySuggestionGuideComponent, {
            disableClose: true,
            width: this.mobileView ? "90vw" : "60vw",
            maxWidth: "90vw",
            maxHeight: "90vh",
            data: {
              mobileView: this.mobileView
            }
          });
        }, 1000);
      }
    });
  }

  postFeed(event) {
    if (typeof event === 'object' && event?.length > 0) {
      // console.log("event", event);
      this.feedNotificationRef.setLastPostId(event[0].postActionId);
      this.userFeeds = [...event, ...this.userFeeds];
      this.cd.detectChanges();
    } else if (event.postActionId) {
      this.feedNotificationRef.setLastPostId(event.postActionId);
      this.userFeeds = [event, ...this.userFeeds];
    } else {
      this.userFeeds = [];
      this.page = 0;
      this.getUserFeeds();
    }
  }

  ngOnInit(): void {
    this.onresize();
    this.getUserFeeds();
    this.getSuggestedCommunities();
    this.getTrendingCommunities();

    // Request notification permission
    this.messagingService.requestPermission();
  }

  ngAfterViewInit(): void {
    // this.feedFrame.nativeElement.onscroll = this.onScroll;
    this.feedFrame.nativeElement.addEventListener('scroll', this.onScroll, true);
    this.renderer.setStyle(document.getElementsByTagName("body")[0], "overflow", "hidden");
  }

  ngOnDestroy() {
    this.feedFrame.nativeElement.removeEventListener('scroll', this.onScroll, true);
    this.renderer.removeStyle(document.getElementsByTagName("body")[0], "overflow");
  }

  onScroll = (event): void => {
    if (!this.scrollCached) {
      setTimeout(() => {
        this.feedComponentHelper();
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 300) {
          if (this.userFeeds.length > 0 && !this.endOfPosts) {
            if (!this.loading) {
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

          // If the page was 0, then feedComponentHelper would have been called
          if (this.page - 1 == 0) {
            setTimeout(() => {
              this.feedComponentHelper();
            }, 1000);
            this.feedNotificationRef.setLastPostId(this.userFeeds[0].postActionId);
          }
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
    });
  }

  feedComponentHelper = () => {
    this.recommendedFeedsComponentList.forEach((recommendedFeedsComponent: RecommendedFeedsComponent) => {
      try {
        recommendedFeedsComponent.elementInViewport();
      } catch (e) {

      }
    });
  }

  notificationListener(data: PushNotificationDTO) {
    if (data.type == NotificationType.normal
      && data.purposeType == NotificationPurposeType.postCreated) {
      // the feed page
      this.feedNotificationRef.receivedNewPostNotification(data.postId);
    }
  }
}
