import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {MatSliderModule} from "@angular/material/slider";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import { FeedsComponent } from './feeds-frame/feeds/feeds.component';
import { ProfileRibbonComponent } from './profile-ribbon/profile-ribbon.component';
import { FloatingFooterComponent } from './floating-footer/floating-footer.component';
import { RecommendedFeedsComponent } from './recommended-feeds/recommended-feeds.component';
import { FloatingAdsComponent } from './floating-ads/floating-ads.component';
import { TrendingFeedsComponent } from './trending-feeds/trending-feeds.component';
import { PostFeedsComponent } from './post-feeds/post-feeds.component';
import {MatCardModule} from "@angular/material/card";
import { FeedsFrameComponent } from './feeds-frame/feeds-frame.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FeedsComponent,
    ProfileRibbonComponent,
    FloatingFooterComponent,
    RecommendedFeedsComponent,
    FloatingAdsComponent,
    TrendingFeedsComponent,
    PostFeedsComponent,
    FeedsFrameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
