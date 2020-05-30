import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ViewMoreButtonComponent } from './view-more-button/view-more-button.component';
import { ProfileIconComponent } from './profile-icon/profile-icon.component';
import { EditUserComponent } from './components/dialogs/edit-user/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SocialMediaLinksComponent } from './social-media-links/social-media-links.component';
import { CompanyRightsFooterComponent } from './company-rights-footer/company-rights-footer.component';

@NgModule({
  declarations: [
    ViewMoreButtonComponent,
    ProfileIconComponent,
    EditUserComponent,
    SocialMediaLinksComponent,
    CompanyRightsFooterComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
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
