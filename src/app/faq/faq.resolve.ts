import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { FAQItemPage } from 'models/faq.model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalConstants } from 'shared/constants';
import { UIService } from 'ui/ui.service';
import { FAQService } from './faq.service';

@Injectable()
export class FAQResolve implements Resolve<Observable<FAQItemPage | void>> {

  constructor(private faqService: FAQService,
    private router: Router,
    private uiService: UIService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<FAQItemPage | void> {
    let faqType = route.paramMap.get('faqType');
    if (faqType) {
      return this.faqService.getFAQItems(faqType).pipe(map((faqItemClassPage: FAQItemPage) => {
        if (faqItemClassPage?.category && faqItemClassPage.faqItemPage?.content?.length > 0) {
          this.uiService.setFAQMetaTags(faqItemClassPage);
          return faqItemClassPage;
        } else {
          this.redirectToErrorPage();
        }
      }), catchError((error: any) => {
        this.redirectToErrorPage();
        return of(undefined);
      }));
    } else {
      this.redirectToErrorPage();
    }
  }

  redirectToErrorPage(): void {
    this.router.navigate(['/', GlobalConstants.error]);
  }
}