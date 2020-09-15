import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalConstants } from 'shared/constants';
import { FAQSearchComponent } from './faq-search/faq-search.component';
import { FAQSearchResolve } from './faq-search/faq-search.resolve';
import { FAQComponent } from './faq.component';
import { FAQResolve } from './faq.resolve';

const routes: Routes = [
    {
        path: GlobalConstants.questnrPath + "/:faqType",
        component: FAQComponent,
        resolve: { faq: FAQResolve }
    },
    {
        path: GlobalConstants.questnrPath,
        component: FAQSearchComponent,
        resolve: { faqSearch: FAQSearchResolve }
    },
    { path: '**', pathMatch: "prefix", redirectTo: GlobalConstants.error },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FAQRoutingModule { }