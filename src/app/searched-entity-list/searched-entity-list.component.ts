import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Community } from 'models/community.model';
import { HashTag } from 'models/hashtag.model';
import { Page } from 'models/page.model';
import { User } from 'models/user.model';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ApiService } from 'shared/api.service';
import { GlobalConstants } from 'shared/constants';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
declare var $: any;

class FilterOption {
  label: string;
  page: number;
  isDataLoading: boolean;
  noDataFound: boolean;
  endOfResults: boolean;
  totalElements: number;
}

@Component({
  selector: 'app-searched-entity-list',
  templateUrl: './searched-entity-list.component.html',
  styleUrls: ['./searched-entity-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchedEntityListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() mobileView: boolean = false;
  @Output() closeThread = new EventEmitter();
  searchInputValue: string;
  selectedSearchOption: number = 0;
  hashtags: HashTag[] = [];
  users: User[] = [];
  communities: Community[] = [];
  defaultUserSrc: string = StaticMediaSrc.userFile;
  defaultCommunitySrc: string = StaticMediaSrc.communityFile;
  fetchingText: string = "Fetching";
  fetchingInterval: any;
  title: string;
  scrollCached: boolean = null;
  listItems = Array(5);
  currentPath: string;
  filterSearchOptionList: FilterOption[] = [{
    label: 'Users',
    page: 0,
    isDataLoading: false,
    noDataFound: false,
    endOfResults: false,
    totalElements: 0
  },
  {
    label: 'Communities',
    page: 0,
    isDataLoading: false,
    noDataFound: false,
    endOfResults: false,
    totalElements: 0
  },
  {
    label: 'Hash Tags',
    page: 0,
    isDataLoading: false,
    noDataFound: false,
    endOfResults: false,
    totalElements: 0
  }];
  userIndex: number = 0;
  communityIndex: number = 1;
  hashTagIndex: number = 2;
  minTabIndex: number = 0;
  maxTabIndex: number = 2;
  selectedIndex = new FormControl(0, Validators.max(2));
  notInListTemplate: string = "Not in the list?";
  endOfResultsTemplate: string = "Sorry, you have reached the end!";
  noDataFoundTemplate: string = "Sorry, we don't have any data matching with given input";
  hashTagAPISubscription: Subscription;
  userAPISubscription: Subscription;
  communityAPISubscription: Subscription;

  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.currentPath = GlobalConstants.userPath;
    this.selectedIndex.valueChanges
      .pipe(debounceTime(100))
      .pipe(distinctUntilChanged())
      .subscribe((queryField: number) => {
        this.selectSearchOption(queryField);
      });
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribeAPIs();
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
    // this.searchEntity(this.searchInputValue);
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
    this.clearData(-1);

    this.fetchEntityList(-1);
  }

  clearData(index: number) {
    if (index == -1 || index === this.userIndex)
      this.users = [];
    if (index == -1 || index === this.communityIndex)
      this.communities = [];
    if (index == -1 || index === this.hashTagIndex)
      this.hashtags = [];
    for (let ind = 0; ind < this.filterSearchOptionList.length; ind++) {
      if (index == -1 || index == ind) {
        this.filterSearchOptionList[ind].endOfResults = false;
        this.filterSearchOptionList[ind].noDataFound = false;
        this.filterSearchOptionList[ind].isDataLoading = false;
        this.filterSearchOptionList[ind].page = 0;
        this.filterSearchOptionList[ind].totalElements = 0;
        if (index != -1) break;
      }
    }
    if (index == -1) {
      this.unsubscribeAPIs();
    }
  }

  unsubscribeAPIs(): void {
    this.hashTagAPISubscription?.unsubscribe();
    this.userAPISubscription?.unsubscribe();
    this.communityAPISubscription?.unsubscribe();
  }

  fetchEntityList(index: number) {
    // console.log("fetchEntityList", this.filterSearchOptionList);
    if (index === -1 || index === this.userIndex) {
      this.title = "Found Users!";
      this.searchUsers();
    }
    if (index === -1 || index === this.communityIndex) {
      this.title = "Found Communities!";
      this.searchCommunities();
    }
    if (index === -1 || index === this.hashTagIndex) {
      this.title = "Found HashTags!";
      this.searchHashtags();
    }
  }

  showLoader(index: number) {
    this.filterSearchOptionList[index].isDataLoading = true;
  }

  hideLoader(index: number) {
    // clearInterval(this.fetchingInterval);
    this.filterSearchOptionList[index].isDataLoading = false;
  }

  searchHashtags() {
    if (this.isDataLoading(this.hashTagIndex)) {
      this.hashTagAPISubscription.unsubscribe();
    }
    this.showLoader(this.hashTagIndex);
    this.hashTagAPISubscription = this.api.searchHashtags(this.page(this.hashTagIndex), this.searchInputValue).subscribe(
      (res: Page<HashTag>) => {
        this.hideLoader(this.hashTagIndex);
        res.content.forEach((ele: HashTag) => {
          this.hashtags.push(ele);
        });
        // set total elements when page == 0
        if (this.page(this.hashTagIndex) == 0) {
          this.filterSearchOptionList[this.hashTagIndex].totalElements = res.totalElements;
        }
        if (res.content.length < 1 && this.hashtags.length == 0) {
          this.clearData(this.hashTagIndex);
          this.filterSearchOptionList[this.hashTagIndex].noDataFound = true;
          this.toggleToNext(this.hashTagIndex);
        } else if (res.content.length < 1 && this.hashtags.length > 0) {
          this.filterSearchOptionList[this.hashTagIndex].endOfResults = true;
        } else
          this.filterSearchOptionList[this.hashTagIndex].page += 1;
      }
    );
  }

  searchUsers() {
    if (this.isDataLoading(this.userIndex)) {
      this.userAPISubscription.unsubscribe();
    }
    this.showLoader(this.userIndex);
    this.userAPISubscription = this.api.searchUsers(this.page(this.userIndex), this.searchInputValue).subscribe(
      (res: Page<User>) => {
        this.hideLoader(this.userIndex);
        res.content.forEach((ele: User) => {
          this.users.push(ele);
        });
        // set total elements when page == 0
        if (this.page(this.userIndex) == 0) {
          this.filterSearchOptionList[this.userIndex].totalElements = res.totalElements;
        }
        if (res.content.length < 1 && this.users.length == 0) {
          this.clearData(this.userIndex);
          this.filterSearchOptionList[this.userIndex].noDataFound = true;
          this.toggleToNext(this.userIndex);
        } else if (res.content.length < 1 && this.users.length > 0) {
          this.filterSearchOptionList[this.userIndex].endOfResults = true;
        } else
          this.filterSearchOptionList[this.userIndex].page += 1;
      }
    );
  }

  searchCommunities() {
    if (this.isDataLoading(this.communityIndex)) {
      this.communityAPISubscription.unsubscribe();
    }
    this.showLoader(this.communityIndex);
    this.communityAPISubscription = this.api.searchCommunities(this.page(this.communityIndex), this.searchInputValue).subscribe(
      (res: Page<Community>) => {
        this.hideLoader(this.communityIndex);
        res.content.forEach((ele: Community) => {
          this.communities.push(ele);
        });
        // set total elements when page == 0
        if (this.page(this.communityIndex) == 0) {
          this.filterSearchOptionList[this.communityIndex].totalElements = res.totalElements;
        }
        if (res.content.length < 1 && this.communities.length == 0) {
          this.clearData(this.communityIndex);
          this.filterSearchOptionList[this.communityIndex].noDataFound = true;
          this.toggleToNext(this.communityIndex);
        } else if (res.content.length < 1 && this.communities.length > 0) {
          this.filterSearchOptionList[this.communityIndex].endOfResults = true;
        } else
          this.filterSearchOptionList[this.communityIndex].page += 1;
      }
    );
  }

  findNextAvailableIndex(currentIndex: number): number {
    let foundIndex = 0;
    for (let index = 0; index < this.maxTabIndex; index++) {
      if (currentIndex !== index && this.filterSearchOptionList[index].totalElements > 0) {
        foundIndex = index;
        break;
      }
    }
    return foundIndex;
  }

  toggleToNext(index: number) {
    setTimeout(() => {
      let availableIndex = this.findNextAvailableIndex(index);
      if (availableIndex !== index) {
        this.selectedSearchOption = availableIndex;
      }
    }, 300);
  }

  label(index: number): string {
    return this.filterSearchOptionList[index].label + " <span class='total-elements'> (" + this.totalElements(index) + ")</span>"
  }

  page(index: number): number {
    return this.filterSearchOptionList[index].page;
  }

  noDataFound(index: number): boolean {
    return this.filterSearchOptionList[index].noDataFound;
  }

  isDataLoading(index: number): boolean {
    return this.filterSearchOptionList[index].isDataLoading;
  }

  endOfResults(index: number): boolean {
    return this.filterSearchOptionList[index].endOfResults;
  }

  totalElements(index: number): number {
    return this.filterSearchOptionList[index].totalElements;
  }

  notInList(index: number): boolean {
    return !this.noDataFound(index)
      && !this.isDataLoading(index) &&
      !this.endOfResults(index);
  }

  closeModal($event) {
    this.closeThread.emit();
  }
}
