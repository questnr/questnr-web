import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { ExploreService } from './explore.service';
import { Post } from '../models/post-action.model';
import { ApiService } from '../shared/api.service';
import { Community } from '../models/community.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from '../shared/constants';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { GlobalService } from 'global.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit, AfterViewInit {
  explore: Post[] = [];
  pathLink = GlobalConstants.explorePath;
  suggestedCommunities: Community[] = [];
  hasTags = [];
  mobileView: boolean = false;
  endOfPosts = false;
  loading: boolean = true;
  scrollCached: boolean = null;
  page: number = 0;
  hashTagUrl = GlobalConstants.hashTagPath;
  queryString: string;
  @ViewChild("exploreFeeds") exploreFeeds: ElementRef;

  constructor(public exploreService: ExploreService,
    public api: ApiService,
    public route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private _globalService: GlobalService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.mobileView = this._globalService.isMobileView();
  }

  ngOnInit(): void {
    this.queryString = this.route.snapshot.paramMap.get('hashTag');
    // console.log(this.queryString);
    this.getSuggestedCommunity();
    this.getTopHashTags();
    this.fetchData();
  }

  ngAfterViewInit() {
    this.exploreFeeds.nativeElement.addEventListener('scroll', this.onScroll, true);
    this.renderer.setStyle(document.getElementsByTagName("body")[0], "overflow", "hidden");
  }

  fetchData() {
    if (this.queryString) {
      this.getHashtagRelatedPost();
    } else {
      this.fetchExplore();
    }
  }

  onScroll = (event): void => {
    if (!this.scrollCached) {
      setTimeout(() => {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 300) {
          // console.log('no im  here');
          if (this.explore.length >= 0 && !this.endOfPosts) {
            // console.log('check network call', this.endOfPosts);
            if (!this.loading)
              this.fetchData();
          }
        }
        this.scrollCached = null;
      }, 100);
    }
    this.scrollCached = event;
  };

  ngOnDestroy() {
    this.exploreFeeds.nativeElement.removeEventListener('scroll', this.onScroll, true);
    this.renderer.removeStyle(document.getElementsByTagName("body")[0], "overflow");
  }

  fetchExplore() {
    this.loading = true;
    this.exploreService.explore(this.page).subscribe((res: any) => {
      // console.log(res);
      if (res.content.length) {
        res.content.forEach(i => {
          this.explore.push(i);
        });
        this.page++;
        this.loading = false;
      } else {
        this.endOfPosts = true;
        this.loading = false;
      }
      // console.log(this.explore);
    }, error => {
      // console.log(error.error.errorMessage);
      this.loading = false;
    });
  }

  getSuggestedCommunity() {
    this.api.getSuggestedCommunities().subscribe((res: any) => {
      if (res.content.length) {
        res.content.forEach(item => {
          this.suggestedCommunities.push(item);
        });
      }
    }, error => {
      // console.log(error.error.errorMessage);
    });
  }

  goToLink(slug) {
    window.open(slug, '_blank');
  }

  checkImg(src) {
    if (src) {
      return src;
    } else {
      return StaticMediaSrc.userFile;
    }
  }

  getTopHashTags() {
    this.api.getTopHashtags().subscribe(
      (res: any) => {
        if (res.content) {
          this.hasTags = res.content;
        }
      }, err => {
      });
  }

  getHashtagRelatedPost() {
    this.loading = true;
    this.exploreService.getHashtagPost(this.queryString, this.page).subscribe((res: any) => {
      if (res.content.length) {
        this.page++;
        res.content.forEach(i => {
          this.explore.push(i);
        });
        this.loading = false;
      } else {
        this.endOfPosts = true;
        this.loading = false;
      }
    }, error => {
      // console.log(error.error.errorMessage);
      this.loading = false;
    });
  }

  removePostNotify($event) {
    this.explore = this.explore.filter((post: Post) =>
      post.postActionId !== $event);
  }
}
