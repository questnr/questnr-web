import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Params, Router } from '@angular/router';
import { GlobalService } from 'global.service';
import { GlobalConstants } from 'shared/constants';

@Component({
  selector: 'app-faq-header',
  templateUrl: './faq-header.component.html',
  styleUrls: ['./faq-header.component.scss']
})
export class FAQHeaderComponent implements OnInit, AfterViewInit {
  @Input() queryString: string;
  @Input() category: string;
  searchFAQControl: FormControl = new FormControl("");
  mobileView: boolean = false;

  constructor(private router: Router,
    private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

  ngAfterViewInit(): void {
    this.searchFAQControl.setValue(this.queryString);
  }

  handleSearchFAQ(inputVal: string) {
    if (inputVal && inputVal.length > 0) {
      const queryParams: Params = { q: inputVal };
      this.router.navigate(
        ['/', GlobalConstants.helpPath, GlobalConstants.questnrPath],
        {
          queryParams: queryParams,
          queryParamsHandling: 'merge', // remove to replace all query params by provided
        });
    }
  }

  setCategory(category: string) {
    this.category = category;
  }
}
