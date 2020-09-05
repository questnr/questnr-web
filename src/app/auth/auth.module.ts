import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'angular-bootstrap-md';
import { AppMaterialModule } from 'app-material/app-material.module';
import { FooterComponent } from 'footer/footer.component';
import { HeaderComponent } from 'header/header.component';
import { LoginRegisterBtnComponent } from 'login-register-btn/login-register-btn.component';
import { CompanyFooterSpanComponent } from 'shared/company-footer-span/company-footer-span.component';
import { CompanyRightsFooterComponent } from 'shared/company-rights-footer/company-rights-footer.component';
import { LoaderModule } from 'shared/loader-text/loader.module';
import { SocialMediaLinksComponent } from 'shared/social-media-links/social-media-links.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginSignupModalComponent } from './login-signup-modal/login-signup-modal.component';
import { LoginSignupTabComponent } from './login-signup-modal/login-signup-tab/login-signup-tab.component';
import { LoginComponent } from './login/login.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginPageComponent,
    SignupComponent,
    SignUpPageComponent,
    ForgotPasswordComponent,
    LoginSignupTabComponent,
    LoginSignupModalComponent,
    LoginRegisterBtnComponent,
    OtpVerificationComponent,
    HeaderComponent,
    FooterComponent,
    ResetPasswordComponent,
    SocialMediaLinksComponent,
    CompanyFooterSpanComponent,
    CompanyRightsFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    ClipboardModule,
    LoaderModule
  ],
  exports: [
    LoginComponent,
    LoginPageComponent,
    SignupComponent,
    SignUpPageComponent,
    ForgotPasswordComponent,
    LoginSignupTabComponent,
    LoginSignupModalComponent,
    LoginRegisterBtnComponent,
    OtpVerificationComponent,
    HeaderComponent,
    FooterComponent,
    ResetPasswordComponent,
    SocialMediaLinksComponent,
    CompanyFooterSpanComponent,
    CompanyRightsFooterComponent
  ]
})
export class AuthModule { }
