import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Community } from 'models/community.model';
import { HashTag } from 'models/hashtag.model';
import { Page } from 'models/page.model';
import { User } from 'models/user.model';
import { ApiService } from 'shared/api.service';
import { GlobalConstants } from 'shared/constants';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { SearchEntityType } from 'models/search-entity.model';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-searched-entity-list',
  templateUrl: './searched-entity-list.component.html',
  styleUrls: ['./searched-entity-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchedEntityListComponent implements OnInit {
  @Input() mobileView: boolean = false;
  @Output() closeThread = new EventEmitter();
  searchInputValue: string;
  selectedSearchOption: number = 0;
  isDataLoading: boolean = false;
  hashtags: HashTag[] = [];
  users: User[] = [];
  communities: Community[] = [];
  defaultUserSrc: string = StaticMediaSrc.userFile;
  defaultCommunitySrc: string = StaticMediaSrc.communityFile;
  fetchingText: string = "Fetching";
  fetchingInterval: any;
  title: string;
  page: number = 0;
  scrollCached: boolean = null;
  endOfResults: boolean = false;
  listItems = Array(5);
  noDataFound: boolean = false;
  currentPath: string;
  filterSearchOptionList: string[] = ['users', 'communities', 'hashtags'];
  selectedIndex = new FormControl(0);

  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.currentPath = GlobalConstants.userPath;
    this.selectedIndex.valueChanges
      .pipe(debounceTime(100))
      .pipe(distinctUntilChanged())
      .subscribe((queryField) => {
        this.selectSearchOption(queryField);
      });
  }

  ngAfterViewInit(): void {
    this.stopParentScroll($("#searched-entity-list_searched-list"))
  }

  stopParentScroll(selector) {
    let last_touch;
    let MouseWheelHandler = (e, selector) => {
      let delta;
      if (e.deltaY)
        delta = e.deltaY;
      else if (e.wheelDelta)
        delta = e.wheelDelta;
      else if (e.changedTouches) {
        if (!last_touch) {
          last_touch = e.changedTouches[0].clientY;
        }
        else {
          if (e.changedTouches[0].clientY > last_touch) {
            delta = -1;
          }
          else {
            delta = 1;
          }
        }
      }
      let prevent = function () {
        e.stopPropagation();
        e.preventDefault();
        e.returnValue = false;
        return false;
      };

      if (selector.scrollTop === 0 && delta < 0) {
        return prevent();
      }
      else if (selector.scrollTop === (selector.scrollHeight - selector.clientHeight) && delta > 0) {
        return prevent();
      }
    };

    selector.onwheel = e => { MouseWheelHandler(e, selector) };
    selector.onmousewheel = e => { MouseWheelHandler(e, selector) };
    selector.ontouchmove = e => { MouseWheelHandler(e, selector) };
  }

  selectSearchOption(selectedIndex: number) {
    // console.log("selectedIndex", selectedIndex);
    if (selectedIndex == 0) {
      this.currentPath = GlobalConstants.userPath;
    } else if (selectedIndex == 1) {
      this.currentPath = GlobalConstants.communityPath;
    } else if (selectedIndex == 2) {
      this.currentPath = GlobalConstants.hashTagPath;
    }
    this.searchEntity(this.searchInputValue);
  }

  searchEntity(searchInputValue: string) {
    // console.log("searchInputValue", searchInputValue);
    if (!searchInputValue || searchInputValue == '') {
      return;
    }
    // if (this.searchInputValue != searchInputValue || this.selectedSearchOption != this.selectedIndex.value) {

    // }
    this.searchInputValue = searchInputValue;
    this.selectedSearchOption = this.selectedIndex.value;
    this.clearData();

    this.fetchEntityList();
  }

  clearData() {
    this.page = 0;
    this.users = [];
    this.communities = [];
    this.hashtags = [];
    this.endOfResults = false;
    this.noDataFound = false;
  }

  fetchEntityList() {
    // console.log("fetchEntityList", this.selectedIndex.value);
    if (this.selectedSearchOption === 0) {
      this.showLoader(this.users.length);
      this.title = "Found Users!";
      this.searchUsers();
    } else if (this.selectedSearchOption === 1) {
      this.showLoader(this.communities.length);
      this.title = "Found Communities!";
      this.searchCommunities();
    } else if (this.selectedSearchOption === 2) {
      this.showLoader(this.hashtags.length);
      this.title = "Found HashTags!";
      this.searchHashtags();
    }
  }

  showLoader(length: number) {
    this.isDataLoading = true;
  }

  hideLoader() {
    // clearInterval(this.fetchingInterval);
    this.isDataLoading = false;
  }

  // startFetchingLoop() {
  //   let fetchingText = "Fetching";
  //   this.fetchingText = fetchingText;
  //   let count = 0;
  //   this.fetchingInterval = setInterval(() => {
  //     if (count < 5) {
  //       this.fetchingText += ".";
  //       count++;
  //     } else {
  //       this.fetchingText = fetchingText;
  //       count = 0;
  //     }
  //   }, 100);
  // }

  // scroll = (event): void => {
  //   if (!this.scrollCached) {
  //     setTimeout(() => {
  //       if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 300) {
  //         if (this.users.length > 1 && !this.endOfResults) {
  //           ++this.page;
  //           this.fetchEntityList();
  //         }
  //       }
  //       this.scrollCached = null;
  //     }, 100);
  //   }
  //   this.scrollCached = event;
  // };

  searchHashtags() {
    this.api.searchHashtags(this.page, this.searchInputValue).subscribe(
      (res: Page<HashTag>) => {
        this.hideLoader();
        res.content.forEach((ele: HashTag) => {
          this.hashtags.push(ele);
        });
        if (res.content.length < 1 && this.hashtags.length == 0) {
          this.clearData();
          this.noDataFound = true;
        } else if (res.content.length < 1 && this.hashtags.length > 0) {
          this.endOfResults = true;
        } else
          this.page++;
      }
    );
  }

  searchUsers() {
    this.api.searchUsers(this.page, this.searchInputValue).subscribe(
      (res: Page<User>) => {
        this.hideLoader();
        res.content.forEach((ele: User) => {
          this.users.push(ele);
        });
        if (res.content.length < 1 && this.users.length == 0) {
          this.clearData();
          this.noDataFound = true;
        } else if (res.content.length < 1 && this.users.length > 0) {
          this.endOfResults = true;
        } else
          this.page++;
      }
    );
  }

  searchCommunities() {
    this.api.searchCommunities(this.page, this.searchInputValue).subscribe(
      (res: Page<Community>) => {
        this.hideLoader();
        res.content.forEach((ele: Community) => {
          this.communities.push(ele);
        });
        if (res.content.length < 1 && this.communities.length == 0) {
          this.clearData();
          this.noDataFound = true;
        } else if (res.content.length < 1 && this.communities.length > 0) {
          this.endOfResults = true;
        } else
          this.page++;
      }
    );
  }

  closeModal($event) {
    this.closeThread.emit();
  }
}
