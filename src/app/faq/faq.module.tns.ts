import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { FaqComponent } from 'src/app/faq/faq.component';
import { CommunityPrivacyComponent } from 'src/app/faq/templates/community-privacy/community-privacy.component';
import { FaqItemComponent } from 'src/app/faq/faq-item/faq-item.component';
import { TitleSeparatorComponent } from 'src/app/faq/title-separator/title-separator.component';
import { FaqSearchComponent } from 'src/app/faq/faq-search/faq-search.component';
import { FaqLoaderComponent } from 'src/app/faq/faq-loader/faq-loader.component';
import { SearchedFaqComponent } from 'src/app/faq/faq-search/searched-faq/searched-faq.component';
import { FaqHeaderComponent } from 'src/app/faq/faq-header/faq-header.component';
import { FaqSearchModalComponent } from 'src/app/faq/faq-search-modal/faq-search-modal.component';
import { FaqSearchMobileComponent } from 'src/app/faq/faq-search-modal/faq-search-mobile/faq-search-mobile.component';
import { FaqSearchInputComponent } from 'src/app/faq/faq-search-input/faq-search-input.component';
import { FaqSearchButtonComponent } from 'src/app/faq/faq-search-button/faq-search-button.component';
import { FaqResolve } from 'src/app/faq/faq.resolve';
import { FaqSearchResolve } from 'src/app/faq/faq-search/faq-search.resolve';

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
