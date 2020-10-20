import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { FaqItemPage } from 'models/faq.model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalConstants } from 'shared/constants';
import { UIService } from 'ui/ui.service';
import { FaqService } from './faq.service';

@Injectable()
export class FaqResolve implements Resolve<Observable<FaqItemPage | void>> {

  constructor(private faqService: FaqService,
    private router: Router,
    private uiService: UIService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<FaqItemPage | void> {
    let faqType = route.paramMap.get('faqType');
    if (faqType) {
      return this.faqService.getFaqItems(faqType).pipe(map((faqItemClassPage: FaqItemPage) => {
        if (faqItemClassPage?.category && faqItemClassPage.faqItemPage?.content?.length > 0) {
          this.uiService.setFaqMetaTags(faqItemClassPage);
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