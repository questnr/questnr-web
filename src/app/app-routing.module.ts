import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileRibbonComponent } from './feeds-frame/profile-ribbon/profile-ribbon.component';
import { FeedsComponent } from './feeds-frame/feeds/feeds.component';
import { FeedsFrameComponent } from './feeds-frame/feeds-frame.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './header/header.component';
import { FloatingFooterComponent } from './feeds-frame/floating-footer/floating-footer.component';
import { RecommendedFeedsComponent } from './feeds-frame/recommended-feeds/recommended-feeds.component';
import { FloatingAdsComponent } from './feeds-frame/floating-ads/floating-ads.component';
import { TrendingFeedsComponent } from './feeds-frame/feeds/trending-feeds/trending-feeds.component';
import { PostFeedsComponent } from './feeds-frame/feeds/post-feeds/post-feeds.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'auth/auth.guard';
import { UserHeaderComponent } from 'feeds-frame/user-header/user-header.component';
import { SidenavComponent } from 'feeds-frame/sidenav/sidenav.component';
import {CommunityComponent} from './community/community.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'feeds', component: FeedsFrameComponent, canActivate: [AuthGuard] },
  { path: 'header', component: HeaderComponent },
  {path: 'community', component: CommunityComponent}
];

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponent = [
  LandingPageComponent,
  HeaderComponent,
  FeedsComponent,
  ProfileRibbonComponent,
  FloatingFooterComponent,
  RecommendedFeedsComponent,
  FloatingAdsComponent,
  TrendingFeedsComponent,
  PostFeedsComponent,
  FeedsFrameComponent,
  LandingPageComponent,
  UserHeaderComponent,
  SidenavComponent
];

