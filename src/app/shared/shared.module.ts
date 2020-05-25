import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ViewMoreButtonComponent } from './view-more-button/view-more-button.component';
import { ProfileIconComponent } from './profile-icon/profile-icon.component';

@NgModule({
  declarations: [
    ViewMoreButtonComponent,
    ProfileIconComponent
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [
  ],
  exports: [
    ViewMoreButtonComponent,
    ProfileIconComponent
  ]
})
export class SharedModule { }
