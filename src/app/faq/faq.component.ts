import { Component, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { GlobalService } from 'global.service';
import { FAQItem, FAQItemPage, FAQItemSearchPage } from 'models/faq.model';
import { KnowMoreLinkType } from 'models/know-more-type';
import { Page } from 'models/page.model';
import { GlobalConstants } from 'shared/constants';
import { FAQService } from './faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FAQComponent implements OnInit, OnDestroy {
  KnowMoreLinkTypeClass = KnowMoreLinkType;
  faqType: string;
  mobileView: boolean = false;
  loading: boolean = true;
  category: string;
  description: string;
  faqItemList: FAQItem[];
  searchFAQControl: FormControl = new FormControl("");

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _globalService: GlobalService,
    private faqService: FAQService,
    private renderer: Renderer2) {
    let faqType = this.route.snapshot.paramMap.get('faqType');
    if (faqType) {
      this.faqService.getFAQItems(faqType).subscribe((faqItemClassPage: FAQItemPage) => {
        if (faqItemClassPage?.category && faqItemClassPage.faqItemPage?.content?.length > 0) {
          this.category = faqItemClassPage.category;
          this.description = faqItemClassPage.description;
          this.faqItemList = faqItemClassPage.faqItemPage.content;
          this.loading = false;
        } else {
          this.redirectToErrorPage();
        }
      });
    } else {
      this.redirectToErrorPage();
    }
  }

  ngOnInit(): void {
    this.renderer.addClass(document.getElementsByTagName('body')[0], 'hide-scrollbar');
    this.mobileView = this._globalService.isMobileView();
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.getElementsByTagName('body')[0], 'hide-scrollbar');
  }

  redirectToErrorPage(): void {
    this.router.navigate(['/', GlobalConstants.error]);
  }

  searchFAQ(inputVal: string) {
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
}
