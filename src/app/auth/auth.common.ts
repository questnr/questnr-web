import { Routes } from '@angular/router';
import { FooterComponent } from 'footer/footer.component';
import { HeaderComponent } from 'header/header.component';
import { LoginRegisterBtnComponent } from 'login-register-btn/login-register-btn.component';
import { CompanyFooterSpanComponent } from 'shared/company-footer-span/company-footer-span.component';
import { CompanyRightsFooterComponent } from 'shared/company-rights-footer/company-rights-footer.component';
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


export const componentDeclarations: any[] = [
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
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
];
