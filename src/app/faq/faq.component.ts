import { Component, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../auth/login.service';
import { GlobalService } from '../global.service';
import { FaqItem, FaqItemPage } from '../models/faq.model';
import { KnowMoreLinkType } from '../models/know-more-type';
import { GlobalConstants } from '../shared/constants';
import { UIService } from '../ui/ui.service';
import { FaqHeaderComponent } from './faq-header/faq-header.component';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqComponent implements OnInit, OnDestroy {
  KnowMoreLinkTypeClass = KnowMoreLinkType;
  faqType: string;
  mobileView: boolean = false;
  loading: boolean = true;
  category: string;
  description: string;
  faqItemList: FaqItem[];
  searchFaqControl: FormControl = new FormControl("");
  faqHeaderRef: FaqHeaderComponent;
  @ViewChild("faqHeader")
  set faqHeader(faqHeaderRef: FaqHeaderComponent) {
    this.faqHeaderRef = faqHeaderRef;
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _globalService: GlobalService,
    private renderer: Renderer2,
    public loginService: LoginService,
    private uiService: UIService) {
    this.loading = true;
    this.route.data.subscribe((data: { faq: FaqItemPage }) => {
      this.category = data.faq.category;
      this.description = data.faq.description;
      this.faqItemList = data.faq.faqItemPage.content;
      this.loading = false;
    });
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
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
}
