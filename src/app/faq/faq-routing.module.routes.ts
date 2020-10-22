import { Routes } from '@angular/router';
import { GlobalConstants } from '../shared/constants';
import { FaqSearchComponent } from './faq-search/faq-search.component';
import { FaqSearchResolve } from './faq-search/faq-search.resolve';
import { FaqComponent } from './faq.component';
import { FaqResolve } from './faq.resolve';

export const routes: Routes = [
    {
        path: GlobalConstants.questnrPath + "/:faqType",
        component: FaqComponent,
        resolve: { faq: FaqResolve }
    },
    {
        path: GlobalConstants.questnrPath,
        component: FaqSearchComponent,
        resolve: { faqSearch: FaqSearchResolve }
    },
    { path: '**', pathMatch: "prefix", redirectTo: GlobalConstants.error },
];
