import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { FAQRoutingModule } from './faq-routing.module';
import { FAQComponent } from './faq.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FAQComponent
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
