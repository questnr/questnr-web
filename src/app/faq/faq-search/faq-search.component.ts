import { Component, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { FAQService } from 'faq/faq.service';
import { GlobalService } from 'global.service';
import { FAQItemSearchPage } from 'models/faq.model';
import { Page, PaginationData } from 'models/page.model';
import { GlobalConstants } from 'shared/constants';

@Component({
  selector: 'app-faq-search',
  templateUrl: './faq-search.component.html',
  styleUrls: ['./faq-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FAQSearchComponent implements OnInit, OnDestroy {
  mobileView: boolean = false;
  loading: boolean = false;
  queryString: string;
  FAQItemSearchedList: FAQItemSearchPage[] = [];
  noData: boolean = false;
  paginationData: PaginationData;
  @ViewChild("paginator") paginator: MatPaginator;
  currentPage: number = 0;

  constructor(
    private route: ActivatedRoute,
    private _globalService: GlobalService,
    private router: Router,
    private faqService: FAQService,
    private renderer: Renderer2
  ) {
    this.route.queryParams.subscribe(params => {
      this.queryString = params['q'];
      if (!this.queryString) {
        this.redirectToErrorPage();
      } else {
        this.clearError();
        this.searchFAQ();
      }
    });
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

  clearError(): void {
    this.currentPage = 0;
    this.noData = false;
  }

  searchFAQ(page: any = "0") {
    this.loading = true;
    this.FAQItemSearchedList = [];
    this.faqService.searchFAQItem(this.queryString, page).subscribe((faqItemSearchPage: Page<FAQItemSearchPage>) => {
      this.loading = false;
      if (!faqItemSearchPage.empty) {
        this.paginationData = faqItemSearchPage;
        this.FAQItemSearchedList = faqItemSearchPage.content;
      } else {
        this.noData = true;
      }
    });
  }

  onPageChange($event: {
    length: number
    pageIndex: number
    pageSize: number
    previousPageIndex: number
  }) {
    if (this.currentPage == $event.pageIndex && this.currentPage == this.paginationData.totalPages - 1) {
      return;
    }
    this.currentPage = $event.pageIndex;
    this.searchFAQ($event.pageIndex);
  }

}
