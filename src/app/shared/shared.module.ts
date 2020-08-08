import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { CommunityBannerComponent } from './community-banner/community-banner.component';
import { CompanyRightsFooterComponent } from './company-rights-footer/company-rights-footer.component';
import { AskQuestionComponent } from './components/dialogs/ask-question/ask-question.component';
import { ProfileIconComponent } from './profile-icon/profile-icon.component';
import { SocialMediaLinksComponent } from './social-media-links/social-media-links.component';
import { ViewMoreButtonComponent } from './view-more-button/view-more-button.component';

@NgModule({
  declarations: [
    ViewMoreButtonComponent,
    SocialMediaLinksComponent,
    CompanyRightsFooterComponent,
    AskQuestionComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatStepperModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
  ],
  exports: [
    ViewMoreButtonComponent,
    SocialMediaLinksComponent,
    CompanyRightsFooterComponent
  ]
})
export class SharedModule { }
