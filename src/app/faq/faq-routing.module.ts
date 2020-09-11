import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FAQComponent } from './faq.component';
import { GlobalConstants } from 'shared/constants';
import { FAQSearchComponent } from './faq-search/faq-search.component';


const routes: Routes = [
    {
        path: GlobalConstants.questnrPath + "/:faqType",
        component: FAQComponent
    },
    {
        path: GlobalConstants.questnrPath,
        component: FAQSearchComponent
    },
    { path: '**', pathMatch: "prefix", redirectTo: GlobalConstants.error },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FAQRoutingModule { }