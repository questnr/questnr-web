import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Params, Router } from '@angular/router';
import { GlobalService } from 'global.service';
import { GlobalConstants } from 'shared/constants';

@Component({
  selector: 'app-faq-search-input',
  templateUrl: './faq-search-input.component.html',
  styleUrls: ['./faq-search-input.component.scss']
})
export class FaqSearchInputComponent implements OnInit {
  @Input() queryString: string;
  mobileView: boolean = false;
  searchFaqControl: FormControl = new FormControl("");
  @Output() closeEmitter = new EventEmitter();
  placeholder: string;

  constructor(private router: Router,
    private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
    if (this.mobileView) {
      this.placeholder = "Type Your Question Here";
    } else {
      this.placeholder = "Search Your Question";
    }
  }

  ngAfterViewInit(): void {
    if (this.queryString)
      this.searchFaqControl.setValue(this.queryString);
  }

  handleSearchFaq(inputVal: string) {
    if (inputVal && inputVal.length > 0) {
      const queryParams: Params = { q: inputVal };
      this.router.navigate(
        ['/', GlobalConstants.helpPath, GlobalConstants.questnrPath],
        {
          queryParams: queryParams,
          queryParamsHandling: 'merge', // remove to replace all query params by provided
        });
    }
    if (this.mobileView) {
      this.handleClose();
    }
  }

  handleClose() {
    this.closeEmitter.emit();
  }

}
