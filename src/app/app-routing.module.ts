import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { AuthGuard } from 'auth/auth.guard';
import { CookiePolicyComponent } from 'cookie-policy/cookie-policy.component';
import { FeedsFrameComponent } from 'feeds-frame/feeds-frame.component';
import { LandingPageResolve } from 'landing-page/landing-page.resolve';
import { PolicyComponent } from 'policy/policy.component';
import { GlobalConstants } from 'shared/constants';
import { SinglePostComponent } from 'single-post/single-post.component';
import { SinglePostResolve } from 'single-post/single-post.resolve';
import { TermsComponent } from 'terms/terms.component';
import { CommunityComponent } from './community/community.component';
import { CommunityResolve } from './community/community.resolve';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ExploreComponent } from './explore/explore.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';

const routes: Routes = [
  {
    path: '', component: LandingPageComponent, pathMatch: 'full',
    resolve: { landingPage: LandingPageResolve }
  },
  { path: GlobalConstants.termsPath, component: TermsComponent },
  { path: GlobalConstants.policyPath, component: PolicyComponent },
  { path: GlobalConstants.cookiePath, component: CookiePolicyComponent },
  { path: GlobalConstants.feedPath, component: FeedsFrameComponent, canActivate: [AuthGuard] },
  { path: GlobalConstants.headerPath, component: HeaderComponent },
  {
    path: GlobalConstants.communityPath + '/:communitySlug', component: CommunityComponent, resolve: {
      community: CommunityResolve
    },
    canActivateChild: [MetaGuard],
    canActivate: [AuthGuard]
  },
  {
    path: GlobalConstants.postPath + '/:postSlug', component: SinglePostComponent,
    resolve: { singlePost: SinglePostResolve }
  },
  { path: GlobalConstants.userPath + '/:userSlug', component: UserProfilePageComponent, canActivate: [AuthGuard] },
  { path: GlobalConstants.explorePath, component: ExploreComponent, canActivate: [AuthGuard] },
  { path: GlobalConstants.trendingPath, component: ExploreComponent, canActivate: [AuthGuard] },
  { path: GlobalConstants.hashTagPath, component: ExploreComponent, canActivate: [AuthGuard] },
  { path: GlobalConstants.forgotPassword, component: ForgotPasswordComponent },
  { path: GlobalConstants.signUp, component: SignUpPageComponent },
  { path: GlobalConstants.login, component: LoginPageComponent },
  { path: GlobalConstants.resetPassword, component: ResetPasswordComponent },
  {
    path: GlobalConstants.helpPath + "/" + GlobalConstants.questnrPath + "/:faqType",
    loadChildren: () => import('./faq/faq.module').then(m => m.FAQModule)
  },
  { path: GlobalConstants.error, component: ErrorPageComponent },
  { path: '**', redirectTo: GlobalConstants.error },
];

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      onSameUrlNavigation: 'reload'
      // enableTracing: true // <-- debugging purposes only
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }