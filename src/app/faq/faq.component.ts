import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'global.service';
import { FAQItem, FAQItemPage } from 'models/faq.model';
import { KnowMoreLinkType } from 'models/know-more-type';
import { GlobalConstants } from 'shared/constants';
import { FAQService } from './faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FAQComponent implements OnInit {
  KnowMoreLinkTypeClass = KnowMoreLinkType;
  faqType: string;
  mobileView: boolean = false;
  loading: boolean = true;
  category: string;
  description: string;
  faqItemList: FAQItem[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _globalService: GlobalService,
    private faqService: FAQService) {
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
    this.mobileView = this._globalService.isMobileView();
  }

  redirectToErrorPage(): void {
    this.router.navigate(['/', GlobalConstants.error]);
  }
}
