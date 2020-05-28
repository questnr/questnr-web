import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileRibbonComponent } from './feeds-frame/profile-ribbon/profile-ribbon.component';
import { FeedsComponent } from './feeds-frame/feeds/feeds.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './header/header.component';
import { FloatingFooterComponent } from './feeds-frame/floating-footer/floating-footer.component';
import { RecommendedFeedsComponent } from './feeds-frame/recommended-feeds/recommended-feeds.component';
import { FloatingAdsComponent } from './feeds-frame/floating-ads/floating-ads.component';
import { TrendingFeedsComponent } from './feeds-frame/feeds/trending-feeds/trending-feeds.component';
import { PostFeedsComponent } from './feeds-frame/feeds/post-feeds/post-feeds.component';

import { AuthGuard } from 'auth/auth.guard';
import { UserHeaderComponent } from 'feeds-frame/user-header/user-header.component';
import { SidenavComponent } from 'feeds-frame/sidenav/sidenav.component';
import { CommunityComponent } from './community/community.component';
import { PostFeedComponent } from 'feeds-frame/post-feed/post-feed.component';
import { FeedsFrameComponent } from 'feeds-frame/feeds-frame.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { SinglePostComponent } from 'single-post/single-post.component';
import { FeedsLoaderComponent } from 'feeds-frame/recommended-feeds/feeds-loader/feeds-loader.component';
import { NotificationItemComponent } from 'feeds-frame/notification-item/notification-item.component';
import { CommunityResolve } from './community/community.resolve';
import { MetaGuard } from '@ngx-meta/core';
import { GlobalConstants } from 'shared/constants';
import { TermsComponent } from 'terms/terms.component';
import { PolicyComponent } from 'policy/policy.component';
import { ExploreComponent } from './explore/explore.component';
import { LandingPageResolve } from 'landing-page/landing-page.resolve';
import { CookiePolicyComponent } from 'cookie-policy/cookie-policy.component';
import { FooterComponent } from 'footer/footer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

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
    canActivateChild: [MetaGuard]
  },
  {
    path: GlobalConstants.postPath + '/:postSlug', component: SinglePostComponent,
    canActivateChild: [MetaGuard]
  },
  { path: GlobalConstants.userPath + '/:userSlug', component: UserProfilePageComponent },
  { path: GlobalConstants.explorePath, component: ExploreComponent },
  { path: GlobalConstants.hashTagPath + '/:hashTag', component: ExploreComponent },
  { path: GlobalConstants.forgotPassword, component: ForgotPasswordComponent },
  { path: GlobalConstants.signUp, component: SignUpPageComponent },
  { path: GlobalConstants.login, component: LoginPageComponent },
  { path: GlobalConstants.resetPassword, component: ResetPasswordComponent }
  // { path: '**', redirectTo: '' }
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
      initialNavigation: 'enabled'
      // enableTracing: true // <-- debugging purposes only
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponent = [
  LandingPageComponent,
  HeaderComponent,
  FeedsComponent,
  ProfileRibbonComponent,
  FloatingFooterComponent,
  FooterComponent,
  RecommendedFeedsComponent,
  FloatingAdsComponent,
  TrendingFeedsComponent,
  PostFeedsComponent,
  FeedsFrameComponent,
  LandingPageComponent,
  TermsComponent,
  PolicyComponent,
  CookiePolicyComponent,
  UserHeaderComponent,
  SidenavComponent,
  PostFeedComponent,
  FeedsLoaderComponent,
  NotificationItemComponent
];

