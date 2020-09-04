import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { FAQRoutingModule } from './faq-routing.module';
import { FAQComponent } from './faq.component';
import { CommunityPrivacyComponent } from './templates/community-privacy/community-privacy.component';
import { FaqItemComponent } from './faq-item/faq-item.component';

@NgModule({
  declarations: [
    FAQComponent,
    CommunityPrivacyComponent,
    FaqItemComponent
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
