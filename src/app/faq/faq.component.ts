import { Component, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'auth/login.service';
import { GlobalService } from 'global.service';
import { FAQItem, FAQItemPage } from 'models/faq.model';
import { KnowMoreLinkType } from 'models/know-more-type';
import { GlobalConstants } from 'shared/constants';
import { FAQHeaderComponent } from './faq-header/faq-header.component';
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
  faqHeaderRef: FAQHeaderComponent;
  @ViewChild("faqHeader")
  set faqHeader(faqHeaderRef: FAQHeaderComponent) {
    this.faqHeaderRef = faqHeaderRef;
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _globalService: GlobalService,
    private faqService: FAQService,
    private renderer: Renderer2,
    public loginService: LoginService) {
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
}
