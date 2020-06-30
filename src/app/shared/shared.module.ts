import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ViewMoreButtonComponent } from './view-more-button/view-more-button.component';
import { ProfileIconComponent } from './profile-icon/profile-icon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SocialMediaLinksComponent } from './social-media-links/social-media-links.component';
import { CompanyRightsFooterComponent } from './company-rights-footer/company-rights-footer.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommunityBannerComponent } from './community-banner/community-banner.component';
import { AdsenseComponent } from './adsense/adsense.component';
import { AskQuestionComponent } from './components/dialogs/ask-question/ask-question.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    ViewMoreButtonComponent,
    ProfileIconComponent,
    SocialMediaLinksComponent,
    CompanyRightsFooterComponent,
    CommunityBannerComponent,
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
    ProfileIconComponent,
    SocialMediaLinksComponent,
    CompanyRightsFooterComponent,
    CommunityBannerComponent
  ]
})
export class SharedModule { }
