import { Component, OnInit } from '@angular/core';
import { ExploreService } from './explore.service';
import { Post } from '../models/post-action.model';
import { ApiService } from '../shared/api.service';
import { Community } from '../models/community.model';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from '../shared/constants';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  constructor(public exploreService: ExploreService, public api: ApiService, public route: ActivatedRoute) {
  }

  explore: Post[] = [];
  suggestedCommunities: Community[] = [];
  hasTags = [];
  mobileView = false;
  screenWidth = window.innerWidth;
  endOfPosts = false;
  loading = true;
  scrollCached: boolean = null;
  page = 0;
  hashTagUrl = '/' + GlobalConstants.hashTagPath + '/';
  queryString: string;

  ngOnInit(): void {
    this.queryString = this.route.snapshot.paramMap.get('hashTag');
    // console.log(this.queryString);
    this.getSuggestedCommunity();
    this.getTopHashTags();
    window.addEventListener('scroll', this.scroll, true);
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
      const el = document.querySelector('.flex-7');
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
    if (this.queryString) {
      this.getHashtagRelatedPost();
    } else {
      this.fetchExplore();
    }
  }

  scroll = (event): void => {
    if (!this.scrollCached) {
      setTimeout(() => {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
          // console.log('no im  here');
          if (this.explore.length >= 0 && !this.endOfPosts) {
            // console.log('check network call', this.endOfPosts);
            this.loading = true;
            ++this.page;
            this.fetchExplore();
          }
        }
        this.scrollCached = null;
      }, 100);
    }
    this.scrollCached = event;
  };

  fetchExplore() {
    this.exploreService.explore(this.page).subscribe((res: any) => {
      // console.log(res);
      if (res.content.length) {
        res.content.forEach(i => {
          this.explore.push(i);
        });
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
    window.open(slug, '_self');
  }

  searchHastag(hashTag) {
    window.open();
  }

  checkImg(src) {
    if (src) {
      return src;
    } else {
      return '/assets/default.jpg';
    }
  }

  getTopHashTags() {
    this.api.getTopHashtags().subscribe(
      (res: any) => {
        this.loading = false;
        if (res.content) {
          this.hasTags = res.content;
        }
      }, err => {
        this.loading = false;
      });
  }

  getHashtagRelatedPost() {
    this.exploreService.getHashtagPost(this.queryString, this.page).subscribe((res: any) => {
      if (res.content.length) {
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
}
