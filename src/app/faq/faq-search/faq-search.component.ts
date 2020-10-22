import { Component, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { FaqService } from '../../faq/faq.service';
import { GlobalService } from '../../global.service';
import { FaqItemSearchPage } from '../../models/faq.model';
import { Page, PaginationData } from '../../models/page.model';
import { GlobalConstants } from '../../shared/constants';
import { UIService } from '../../ui/ui.service';

@Component({
  selector: 'app-faq-search',
  templateUrl: './faq-search.component.html',
  styleUrls: ['./faq-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqSearchComponent implements OnInit, OnDestroy {
  mobileView: boolean = false;
  loading: boolean = false;
  queryString: string;
  FAQItemSearchedList: FaqItemSearchPage[] = [];
  noData: boolean = false;
  paginationData: PaginationData;
  @ViewChild("paginator") paginator: MatPaginator;
  currentPage: number = 0;

  constructor(
    private route: ActivatedRoute,
    private _globalService: GlobalService,
    private router: Router,
    private faqService: FaqService,
    private renderer: Renderer2,
    public loginService: LoginService,
    private uiService: UIService) {
    this.route.queryParams.subscribe(params => {
      this.queryString = params['q'];
      if (!this.queryString) {
        this.redirectToErrorPage();
      } else {
        this.clearError();
        this.searchFaq();
      }
    });
  }

  ngOnInit(): void {
    this.renderer.addClass(document.getElementsByTagName('body')[0], 'hide-scrollbar');
    this.mobileView = this._globalService.isMobileView();
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.getElementsByTagName('body')[0], 'hide-scrollbar');
    this.uiService.resetTitle();
  }

  redirectToErrorPage(): void {
    this.router.navigate(['/', GlobalConstants.error]);
  }

  clearError(): void {
    this.currentPage = 0;
    this.noData = false;
  }

  searchFaq(page: any = "0") {
    this.loading = true;
    this.FAQItemSearchedList = [];
    this.faqService.searchFaqItem(this.queryString, page).subscribe((faqItemSearchPage: Page<FaqItemSearchPage>) => {
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
    this.searchFaq($event.pageIndex);
  }

}
