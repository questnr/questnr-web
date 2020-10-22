import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { FaqComponent } from './faq.component';
import { CommunityPrivacyComponent } from './templates/community-privacy/community-privacy.component';
import { FaqItemComponent } from './faq-item/faq-item.component';
import { TitleSeparatorComponent } from './title-separator/title-separator.component';
import { FaqSearchComponent } from './faq-search/faq-search.component';
import { FaqLoaderComponent } from './faq-loader/faq-loader.component';
import { SearchedFaqComponent } from './faq-search/searched-faq/searched-faq.component';
import { FaqHeaderComponent } from './faq-header/faq-header.component';
import { FaqSearchModalComponent } from './faq-search-modal/faq-search-modal.component';
import { FaqSearchMobileComponent } from './faq-search-modal/faq-search-mobile/faq-search-mobile.component';
import { FaqSearchInputComponent } from './faq-search-input/faq-search-input.component';
import { FaqSearchButtonComponent } from './faq-search-button/faq-search-button.component';
import { FaqResolve } from './faq.resolve';
import { FaqSearchResolve } from './faq-search/faq-search.resolve';

@NgModule({
  imports: [
    NativeScriptCommonModule
  ],
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
  FaqSearchButtonComponent],
  providers: [
  FaqResolve,
  FaqSearchResolve],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class FaqModule { }
