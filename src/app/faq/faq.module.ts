import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { FaqHeaderComponent } from './faq-header/faq-header.component';
import { FaqItemComponent } from './faq-item/faq-item.component';
import { FaqLoaderComponent } from './faq-loader/faq-loader.component';
import { FaqRoutingModule } from './faq-routing.module';
import { FaqSearchMobileComponent } from './faq-search-modal/faq-search-mobile/faq-search-mobile.component';
import { FaqSearchModalComponent } from './faq-search-modal/faq-search-modal.component';
import { FaqSearchComponent } from './faq-search/faq-search.component';
import { SearchedFaqComponent } from './faq-search/searched-faq/searched-faq.component';
import { FaqComponent } from './faq.component';
import { CommunityPrivacyComponent } from './templates/community-privacy/community-privacy.component';
import { TitleSeparatorComponent } from './title-separator/title-separator.component';
import { FaqSearchInputComponent } from './faq-search-input/faq-search-input.component';
import { FaqSearchButtonComponent } from './faq-search-button/faq-search-button.component';
import { FaqResolve } from './faq.resolve';
import { FaqSearchResolve } from './faq-search/faq-search.resolve';

@NgModule({
  declarations: [
    FaqComponent,
    CommunityPrivacyComponent,
    FaqItemComponent,
    TitleSeparatorComponent,
    FaqSearchComponent,
    FaqLoaderComponent,
    SearchedFaqComponent,
    FaqHeaderComponent,
    FaqSearchModalComponent,
    FaqSearchMobileComponent,
    FaqSearchInputComponent,
    FaqSearchButtonComponent
  ],
  imports: [
    CommonModule,
    FaqRoutingModule,
    SharedModule
  ],
  exports: [
    FaqComponent
  ],
  bootstrap: [FaqComponent],
  providers: [
    FaqResolve,
    FaqSearchResolve
  ]
})
export class FaqModule { }
