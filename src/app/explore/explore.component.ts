import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GlobalService } from 'global.service';
import { HashTag } from 'models/hashtag.model';
import { Page } from 'models/page.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { Community } from '../models/community.model';
import { Post } from '../models/post-action.model';
import { ApiService } from '../shared/api.service';
import { GlobalConstants } from '../shared/constants';
import { ExploreService } from './explore.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  encapsulation: ViewEncapsulation.None
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
  seachHashTagBucket: HashTag[] = [];
  queryParams: string;
  hashTagsForm: FormGroup;
  hashTagControl: FormControl = new FormControl('', Validators.pattern(/^[A-z0-9 ]*$/));
  tagsCount = new FormControl(0, {
    validators: [
      Validators.min(1),
      Validators.max(10)
    ]
  });
  nullError: boolean = false;
  bucketFullError: boolean = false;
  bucketEmptyError: boolean = false;
  tagMaxLengthError: boolean = false;
  tagExistsError: boolean = false;
  searchResults: HashTag[];

  constructor(public exploreService: ExploreService,
    public api: ApiService,
    public route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private _globalService: GlobalService,
    private fb: FormBuilder) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.mobileView = this._globalService.isMobileView();
    this.hashTagsForm = this.fb.group({
      hashTagControl: this.hashTagControl,
      tagsCount: this.tagsCount
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.queryString = params['q'];
      let hashtags: string[] = this.queryString.split(",");
      hashtags.forEach((hasTag: string) => {
        this.seachHashTagBucket.push(new HashTag(hasTag));
      })
    });
    // this.queryString = this.route.snapshot.paramMap.get('hashTag');

    // console.log(this.queryString);
    this.getSuggestedCommunity();
    this.getTopHashTags();
    this.fetchData();
    this.hashTagControl.valueChanges
      .pipe(debounceTime(200))
      .pipe(distinctUntilChanged())
      .subscribe((queryField) => {
        this.resetTagErrors();
        if (!queryField || queryField.length < 1) {
          this.searchResults = [];
        } else {
          this.api.searchHashtags(0, queryField).subscribe(
            (res: Page<HashTag>) => {
              this.searchResults = res.content;
            });
        }
      });
  }

  ngAfterViewInit() {
    this.exploreFeeds.nativeElement.addEventListener('scroll', this.onScroll, true);
    this.renderer.setStyle(document.getElementsByTagName("body")[0], "overflow", "hidden");
  }

  fetchData() {
    if (this.queryString) {
      this.getHashtagRelatedPost(false);
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

  getHashtagRelatedPost(searchedListChanged: boolean = false) {
    if (searchedListChanged == true) {
      this.explore = [];
      this.page = 0;
      this.exploreFeeds.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
    this.loading = true;
    this.exploreService.getHashtagPost(this.queryParams, this.page).subscribe((res: any) => {
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

  removeHashTagToSearchingBucket(hashTag: HashTag) {
    this.seachHashTagBucket = this.seachHashTagBucket.filter((searchedHashTag: HashTag) => {
      return searchedHashTag.hashTagValue != hashTag.hashTagValue;
    });
  }

  removeHashTagToSearchingBucketEvent($event, hashTag: HashTag) {
    $event.preventDefault();
    this.seachHashTagBucket = this.seachHashTagBucket.filter((searchedHashTag: HashTag) => {
      return searchedHashTag.hashTagValue != hashTag.hashTagValue;
    });
    this.updateQuery();
  }

  toggleHashTagToSearchingBucket(hashTag: HashTag) {
    if (this.isInListofSeachingBucket(hashTag)) {
      if (this.seachHashTagBucket.length > 1) {
        this.removeHashTagToSearchingBucket(hashTag);
      }
    } else {
      this.addHashTagToSearchingBucket(hashTag);
    }
    this.updateQuery();
  }

  isInListofSeachingBucket(hashTag: HashTag) {
    let hasFound: boolean = false;
    this.seachHashTagBucket.forEach((searchedHashTag: HashTag) => {
      if (searchedHashTag.hashTagValue == hashTag.hashTagValue) hasFound = true;
    });
    return hasFound;
  }

  updateQuery() {
    this.queryParams = '';
    this.seachHashTagBucket.forEach((searchedHashTag: HashTag, index: number) => {
      if (index == 0) {
        this.queryParams = searchedHashTag.hashTagValue;
      } else {
        this.queryParams += "," + searchedHashTag.hashTagValue;
      }
    });
    const queryParams: Params = { q: this.queryParams };

    this.router.navigate(
      [],
      {
        queryParams: queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  resetTagErrors() {
    this.nullError = false;
    this.tagExistsError = false;
    this.bucketFullError = false;
    this.bucketEmptyError = false;
    this.tagMaxLengthError = false;
  }

  isInListofSeachingBucketUsingInput(value: string) {
    let doesNotHave = false;
    this.seachHashTagBucket.forEach((searchedHashTag: HashTag) => {
      if (searchedHashTag.hashTagValue.toLowerCase().trim() === value.toLocaleLowerCase().trim()) {
        doesNotHave = true;
      }
    });
    return doesNotHave;
  }

  addHashTagToSearchingBucket(hashTag: HashTag) {
    this.resetTagErrors();
    this.seachHashTagBucket.push(hashTag);
    this.hashTagControl.setValue("");
    this.searchResults = [];
    setTimeout(() => {
      this.getHashtagRelatedPost(true);
    }, 400);
  }

  addHashTagToSearchingBucketUsingInput(value: string) {
    this.resetTagErrors();
    if (!(value && value.length > 0)) return;
    if (this.isInListofSeachingBucketUsingInput(value)) {
      this.tagExistsError = true;
      return;
    }
    if (this.seachHashTagBucket.length >= 10) {
      this.bucketFullError = true;
    }
    else {
      if (value.length > 30) {
        this.tagMaxLengthError = true;
      } else if (this.hashTagControl.valid) {
        this.tagsCount.setValue(Number(this.tagsCount.value) + 1);
        this.hashTagControl.setValue("");
        this.searchResults = [];
        this.seachHashTagBucket.push(new HashTag(value.toLowerCase()));
      }
    }
  }
}
