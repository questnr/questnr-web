import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ViewMoreButtonComponent } from './view-more-button/view-more-button.component';
import { ProfileIconComponent } from './profile-icon/profile-icon.component';
import { SocialMediaLinksComponent } from './social-media-links/social-media-links.component';
import { CompanyRightsFooterComponent } from './company-rights-footer/company-rights-footer.component';

@NgModule({
  declarations: [
    ViewMoreButtonComponent,
    ProfileIconComponent,
    SocialMediaLinksComponent,
    CompanyRightsFooterComponent,
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [
  ],
  exports: [
    ViewMoreButtonComponent,
    ProfileIconComponent,
    SocialMediaLinksComponent,
    CompanyRightsFooterComponent
  ]
})
export class SharedModule { }
