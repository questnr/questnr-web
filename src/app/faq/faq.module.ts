import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { FAQHeaderComponent } from './faq-header/faq-header.component';
import { FaqItemComponent } from './faq-item/faq-item.component';
import { FaqLoaderComponent } from './faq-loader/faq-loader.component';
import { FAQRoutingModule } from './faq-routing.module';
import { FAQSearchMobileComponent } from './faq-search-modal/faq-search-mobile/faq-search-mobile.component';
import { FAQSearchModalComponent } from './faq-search-modal/faq-search-modal.component';
import { FAQSearchComponent } from './faq-search/faq-search.component';
import { SearchedFaqComponent } from './faq-search/searched-faq/searched-faq.component';
import { FAQComponent } from './faq.component';
import { CommunityPrivacyComponent } from './templates/community-privacy/community-privacy.component';
import { TitleSeparatorComponent } from './title-separator/title-separator.component';
import { FAQSearchInputComponent } from './faq-search-input/faq-search-input.component';
import { FAQSearchButtonComponent } from './faq-search-button/faq-search-button.component';
import { FAQResolve } from './faq.resolve';
import { FAQSearchResolve } from './faq-search/faq-search.resolve';

@NgModule({
  declarations: [
    FAQComponent,
    CommunityPrivacyComponent,
    FaqItemComponent,
    TitleSeparatorComponent,
    FAQSearchComponent,
    FaqLoaderComponent,
    SearchedFaqComponent,
    FAQHeaderComponent,
    FAQSearchModalComponent,
    FAQSearchMobileComponent,
    FAQSearchInputComponent,
    FAQSearchButtonComponent
  ],
  imports: [
    CommonModule,
    FAQRoutingModule,
    SharedModule
  ],
  exports: [
    FAQComponent
  ],
  bootstrap: [FAQComponent],
  providers: [
    FAQResolve,
    FAQSearchResolve
  ]
})
export class FAQModule { }
