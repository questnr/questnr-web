import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { FAQHeaderComponent } from './faq-header/faq-header.component';
import { FaqItemComponent } from './faq-item/faq-item.component';
import { FaqLoaderComponent } from './faq-loader/faq-loader.component';
import { FAQRoutingModule } from './faq-routing.module';
import { FAQSearchComponent } from './faq-search/faq-search.component';
import { SearchedFaqComponent } from './faq-search/searched-faq/searched-faq.component';
import { FAQComponent } from './faq.component';
import { CommunityPrivacyComponent } from './templates/community-privacy/community-privacy.component';
import { TitleSeparatorComponent } from './title-separator/title-separator.component';

@NgModule({
  declarations: [
    FAQComponent,
    CommunityPrivacyComponent,
    FaqItemComponent,
    TitleSeparatorComponent,
    FAQSearchComponent,
    FaqLoaderComponent,
    SearchedFaqComponent,
    FAQHeaderComponent
  ],
  imports: [
    CommonModule,
    FAQRoutingModule,
    SharedModule
  ],
  exports: [
    FAQComponent
  ],
  bootstrap: [FAQComponent]
})
export class FAQModule { }
