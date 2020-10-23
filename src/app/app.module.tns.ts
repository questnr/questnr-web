import { AsyncPipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { NativeScriptHttpClientModule, NativeScriptModule } from '@nativescript/angular';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { ShareButtonsConfig } from '@ngx-share/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, LoginOpt, SocialLoginModule } from 'angularx-social-login';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module.tns';
import { App2Component } from './app2.component';
import { AskQuestionBtnComponent } from './ask-question-btn/ask-question-btn.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginService } from './auth/login.service';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CommunityActivityComponent } from './community-activity/community-activity.component';
import { CommunityBoxComponent } from './community-box/community-box.component';
import { CommunityLoaderComponent } from './community-box/community-loader/community-loader.component';
import { NoCommunityComponent } from './community-box/no-community/no-community.component';
import { CommunityRelationActionButtonComponent } from './community-relation-action-button/community-relation-action-button.component';
import { CommunitySuggestionGuideComponent } from './community-suggestion-guide/community-suggestion-guide.component';
import { CommunityUsersComponent } from './community-users/community-users.component';
import { NoCommunityMembersComponent } from './community-users/no-community-members/no-community-members.component';
import { CommunityHorizontalCardComponent } from './community/community-horizontal-card/community-horizontal-card.component';
import { CommunityComponent } from './community/community.component';
import { CommunityResolve } from './community/community.resolve';
import { HorizontalOwnerProfileComponent } from './community/horizontal-owner-profile/horizontal-owner-profile.component';
import { ConfirmDialogService } from './confirm-dialog-modal/confirm-dialog.service';
import { ConfirmDialogComponent } from './confirm-dialog-modal/confirm-dialog/confirm-dialog.component';
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { CreateCommunityBtnComponent } from './create-community-btn/create-community-btn.component';
import { CustomTooltipComponent } from './custom-tooltip/custom-tooltip.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ExploreComponent } from './explore/explore.component';
import { FaqModule } from './faq/faq.module';
import { FeedsFrameComponent } from './feeds-frame/feeds-frame.component';
import { FloatingAdsComponent } from './feeds-frame/floating-ads/floating-ads.component';
import { FloatingFooterComponent } from './feeds-frame/floating-footer/floating-footer.component';
import { PostFeedComponent } from './feeds-frame/post-feed/post-feed.component';
import { PostReportComponent } from './feeds-frame/post-report/post-report.component';
import { ProfileRibbonComponent } from './feeds-frame/profile-ribbon/profile-ribbon.component';
import { FeedsLoaderComponent } from './feeds-frame/recommended-feeds/feeds-loader/feeds-loader.component';
import { RecommendedFeedsComponent } from './feeds-frame/recommended-feeds/recommended-feeds.component';
import { RecommendedFeedsResolve } from './feeds-frame/recommended-feeds/recommended-feeds.resolve';
import { SidenavComponent } from './feeds-frame/sidenav/sidenav.component';
import { FloatingCommunitiesBarComponent } from './floating-communities-bar/floating-communities-bar.component';
import { FloatingMobileNavComponent } from './floating-mobile-nav/floating-mobile-nav.component';
import { FloatingSuggestionBoxComponent } from './floating-suggestion-box/floating-suggestion-box.component';
import { GlobalService } from './global.service';
import { HashTagComponent } from './hash-tag/hash-tag.component';
import { ImgCropperWrapperComponent } from './img-cropper-wrapper/img-cropper-wrapper.component';
import { ImgCropperComponent } from './img-cropper-wrapper/img-cropper/img-cropper.component';
import { InfoTooltipComponent } from './info-tooltip/info-tooltip.component';
import { InterceptorService } from './interceptor.service';
import { JoinedCommunityComponent } from './joined-community/joined-community.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandingPageResolve } from './landing-page/landing-page.resolve';
import { FullScreenMediaService } from './media-container/full-screen-media.service';
import { FullScreenMediaComponent } from './media-container/full-screen-media/full-screen-media.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PolicyComponent } from './policy/policy.component';
import { QuickNavComponent } from './quick-nav/quick-nav.component';
import { RelationActionButtonComponent } from './relation-action-button/relation-action-button.component';
import { RichTextAreaComponent } from './rich-text-area/rich-text-area.component';
import { MessagingService } from './service/messaging.service';
import { AdsenseComponent } from './shared/adsense/adsense.component';
import { CommunityBannerComponent } from './shared/community-banner/community-banner.component';
import { CommunityCardMobileViewComponent } from './shared/components/community-card-mobile-view/community-card-mobile-view.component';
import { AskQuestionComponent } from './shared/components/dialogs/ask-question/ask-question.component';
import { CommunityListComponent } from './shared/components/dialogs/community-list/community-list.component';
import { CreateCommunityComponent } from './shared/components/dialogs/create-community/create-community.component';
import { DescriptionComponent } from './shared/components/dialogs/description/description.component';
import { SharePostComponent } from './shared/components/dialogs/share-post/share-post.component';
import { UserListComponent } from './shared/components/dialogs/user-list/user-list.component';
import { ViewImageComponent } from './shared/components/dialogs/view-image/view-image.component';
import { DotComponent } from './shared/components/dot/dot.component';
import { MoreOptionComponent } from './shared/components/more-option/more-option.component';
import { CommunityCardLoaderComponent } from './shared/loaders/community-card-loader/community-card-loader.component';
import { CommunityListLoaderComponent } from './shared/loaders/community-list-loader/community-list-loader.component';
import { UserListLoaderComponent } from './shared/loaders/user-list-loader/user-list-loader.component';
import { SharedModule } from './shared/shared.module';
import { UserDescriptionCardComponent } from './shared/user-description-card/user-description-card.component';
import { UserListViewComponent } from './shared/user-list-view/user-list-view.component';
import { SinglePostModule } from './single-post/single-post.module';
import { SinglePostResolve } from './single-post/single-post.resolve';
import { SponsoredComponent } from './sponsored/sponsored.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { TermsComponent } from './terms/terms.component';
import { TrendPostQuestionComponent } from './trend-post-question/trend-post-question.component';
import { TrendingComponent } from './trending/trending.component';
import { UIService } from './ui/ui.service';
import { UserActivityBarComponent } from './user-activity/user-activity-bar/user-activity-bar.component';
import { UserActivityComponent } from './user-activity/user-activity.component';
import { UserProfileCardComponent } from './user-profile-card/user-profile-card.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { NoUserQuestionComponent } from './user-question-list/no-user-question/no-user-question.component';
import { UserQuestionListModalComponent } from './user-question-list/user-question-list-modal/user-question-list-modal.component';
import { UserQuestionListComponent } from './user-question-list/user-question-list.component';
import { UserQuestionLoaderComponent } from './user-question-list/user-question-loader/user-question-loader.component';
import { UserQuestionComponent } from './user-question-list/user-question/user-question.component';
import { UsercommunityComponent } from './usercommunity/usercommunity.component';




const customConfig: ShareButtonsConfig = {
  include: ['facebook', 'twitter', 'linkedin', 'whatsapp', 'email'],
  theme: 'circles-light',
  autoSetMeta: true,
};

const fbLoginOptions: LoginOpt = {
  scope: 'email,birthday,first_name,last_name',
  return_scopes: true,
  enable_profile_selector: true
};

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.googleKey)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.fbKey, fbLoginOptions)
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    App2Component,
    FeedsFrameComponent,
    AskQuestionBtnComponent,
    CardHeaderComponent,
    CommunityComponent,
    HorizontalOwnerProfileComponent,
    CommunityHorizontalCardComponent,
    CommunityActivityComponent,
    CommunityBoxComponent,
    CommunityRelationActionButtonComponent,
    NoCommunityComponent,
    CommunityLoaderComponent,
    CommunitySuggestionGuideComponent,
    CommunityUsersComponent,
    NoCommunityMembersComponent,
    ConfirmDialogComponent,
    CookiePolicyComponent,
    CreateCommunityBtnComponent,
    CustomTooltipComponent,
    EditUserComponent,
    ErrorPageComponent,
    ExploreComponent,
    FloatingAdsComponent,
    FloatingFooterComponent,
    PostFeedComponent,
    PostReportComponent,
    ProfileRibbonComponent,
    RecommendedFeedsComponent,
    FeedsLoaderComponent,
    SidenavComponent,
    FloatingCommunitiesBarComponent,
    FloatingMobileNavComponent,
    FloatingSuggestionBoxComponent,
    HashTagComponent,
    ImgCropperWrapperComponent,
    ImgCropperComponent,
    InfoTooltipComponent,
    JoinedCommunityComponent,
    LandingPageComponent,
    FullScreenMediaComponent,
    NavBarComponent,
    PolicyComponent,
    QuickNavComponent,
    RelationActionButtonComponent,
    RichTextAreaComponent,
    AdsenseComponent,
    CommunityBannerComponent,
    CommunityCardMobileViewComponent,
    AskQuestionComponent,
    CommunityListComponent,
    CreateCommunityComponent,
    DescriptionComponent,
    SharePostComponent,
    UserListComponent,
    ViewImageComponent,
    DotComponent,
    MoreOptionComponent,
    UserListLoaderComponent,
    CommunityListLoaderComponent,
    CommunityCardLoaderComponent,
    UserDescriptionCardComponent,
    UserListViewComponent,
    SponsoredComponent,
    SuggestionComponent,
    TermsComponent,
    TrendingComponent,
    TrendPostQuestionComponent,
    UserActivityComponent,
    UserActivityBarComponent,
    UserProfileCardComponent,
    UserProfilePageComponent,
    UserQuestionListComponent,
    NoUserQuestionComponent,
    UserQuestionComponent,
    UserQuestionListModalComponent,
    UserQuestionLoaderComponent,
    UsercommunityComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    AppRoutingModule,
    SharedModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FaqModule,
    SinglePostModule,
    MDBBootstrapModule.forRoot(),
    SocialLoginModule,
    ShareButtonsModule.withConfig(customConfig),
  ],
  providers: [
    AsyncPipe,
    AuthGuard,
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    MessagingService,
    CommunityResolve,
    LandingPageResolve,
    SinglePostResolve,
    RecommendedFeedsResolve,
    GlobalService,
    FullScreenMediaService,
    ConfirmDialogService,
    UIService
  ],
  bootstrap: [App2Component],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
