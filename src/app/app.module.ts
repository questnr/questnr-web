import { ClipboardModule } from '@angular/cdk/clipboard';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { ShareButtonsConfig } from '@ngx-share/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, LoginOpt, SocialLoginModule } from 'angularx-social-login';
import { AskQuestionBtnComponent } from 'ask-question-btn/ask-question-btn.component';
import { AttachedFileListComponent } from 'attached-file-list/attached-file-list.component';
import { AttachedFileComponent } from 'attached-file/attached-file.component';
import { AuthGuard } from 'auth/auth.guard';
import { LoginService } from 'auth/login.service';
import { BlogTitleComponent } from 'blog-title/blog-title.component';
import { CommunityActivityComponent } from 'community-activity/community-activity.component';
import { CommunityRelationActionButtonComponent } from 'community-relation-action-button/community-relation-action-button.component';
import { CommunitySuggestionGuideComponent } from 'community-suggestion-guide/community-suggestion-guide.component';
import { HorizontalOwnerProfileComponent } from 'community/horizontal-owner-profile/horizontal-owner-profile.component';
import { ConfirmDialogComponent } from 'confirm-dialog/confirm-dialog.component';
import { CookiePolicyComponent } from 'cookie-policy/cookie-policy.component';
import { CustomTooltipComponent } from 'custom-tooltip/custom-tooltip.component';
import { DragDropDirective } from 'drag-drop.directive';
import { EditUserComponent } from 'edit-user/edit-user.component';
import { FAQModule } from 'faq/faq.module';
import { FeedTextComponent } from 'feed-text/feed-text.component';
import { FeedsFrameComponent } from 'feeds-frame/feeds-frame.component';
import { PostMenuOptionsComponent } from 'feeds-frame/post-menu-options/post-menu-options.component';
import { PostReportComponent } from 'feeds-frame/post-report/post-report.component';
import { FeedsLoaderComponent } from 'feeds-frame/recommended-feeds/feeds-loader/feeds-loader.component';
import { SidenavComponent } from 'feeds-frame/sidenav/sidenav.component';
import { FloatingSuggestionBoxComponent } from 'floating-suggestion-box/floating-suggestion-box.component';
import { FooterComponent } from 'footer/footer.component';
import { GlobalService } from 'global.service';
import { ImgCropperWrapperComponent } from 'img-cropper-wrapper/img-cropper-wrapper.component';
import { ImgCropperComponent } from 'img-cropper-wrapper/img-cropper/img-cropper.component';
import { InfoTooltipComponent } from 'info-tooltip/info-tooltip.component';
import { LandingPageResolve } from 'landing-page/landing-page.resolve';
import { LoginRegisterBtnComponent } from 'login-register-btn/login-register-btn.component';
import { LoginSignupModalComponent } from 'login-signup-modal/login-signup-modal.component';
import { LoginSignupTabComponent } from 'login-signup-modal/login-signup-tab/login-signup-tab.component';
import { FullScreenMediaService } from 'media-container/full-screen-media.service';
import { FullScreenMediaComponent } from 'media-container/full-screen-media/full-screen-media.component';
import { MediaContainerComponent } from 'media-container/media-container.component';
import { NavBarComponent } from 'nav-bar/nav-bar.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { QuillModule } from 'ngx-quill';
import { OtpVerificationComponent } from 'otp-verification/otp-verification.component';
import { PolicyComponent } from 'policy/policy.component';
import { RelationActionButtonComponent } from 'relation-action-button/relation-action-button.component';
import { RichTextComponent } from 'rich-text/rich-text.component';
import { AdsenseComponent } from 'shared/adsense/adsense.component';
import { CommunityBannerComponent } from 'shared/community-banner/community-banner.component';
import { CompanyFooterSpanComponent } from 'shared/company-footer-span/company-footer-span.component';
import { CompanyRightsFooterComponent } from 'shared/company-rights-footer/company-rights-footer.component';
import { AskQuestionComponent } from 'shared/components/dialogs/ask-question/ask-question.component';
import { WelcomeSlidesComponent } from 'shared/components/dialogs/welcome-slides/welcome-slides.component';
import { KnowMoreLinkComponent } from 'shared/components/know-more-link/know-more-link.component';
import { GlobalConstants } from 'shared/constants';
import { SharedModule } from 'shared/shared.module';
import { SocialMediaLinksComponent } from 'shared/social-media-links/social-media-links.component';
import { UserDescriptionCardComponent } from 'shared/user-description-card/user-description-card.component';
import { SinglePostResolve } from 'single-post/single-post.resolve';
import { TermsComponent } from 'terms/terms.component';
import { TrendingPostPollQuestionComponent } from 'trend-post-question/trend-post-question.component';
import { UserActivityBarComponent } from 'user-activity/user-activity-bar/user-activity-bar.component';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CommunityUsersComponent } from './community-users/community-users.component';
// import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
// import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { CommunityComponent } from './community/community.component';
import { CommunityResolve } from './community/community.resolve';
import { CreateCommunityBtnComponent } from './create-community-btn/create-community-btn.component';
import { DynamicHTMLModule } from './dynamic-html';
import { EmoticonsComponent } from './emoticons/emoticons.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ExploreComponent } from './explore/explore.component';
import { FeedsComponent } from './feeds-frame/feeds/feeds.component';
import { PostFeedsComponent } from './feeds-frame/feeds/post-feeds/post-feeds.component';
import { TrendingFeedsComponent } from './feeds-frame/feeds/trending-feeds/trending-feeds.component';
import { FloatingAdsComponent } from './feeds-frame/floating-ads/floating-ads.component';
import { FloatingFooterComponent } from './feeds-frame/floating-footer/floating-footer.component';
import { PostFeedComponent } from './feeds-frame/post-feed/post-feed.component';
import { ProfileRibbonComponent } from './feeds-frame/profile-ribbon/profile-ribbon.component';
// import {MatDialogModule, MatSelectModule, MatTooltipModule} from '@angular/material';
import { CommentBoxComponent } from './feeds-frame/recommended-feeds/comment-box/comment-box.component';
import { RecommendedFeedsComponent } from './feeds-frame/recommended-feeds/recommended-feeds.component';
import { FloatingCommunitiesBarComponent } from './floating-communities-bar/floating-communities-bar.component';
import { FloatingMobileNavComponent } from './floating-mobile-nav/floating-mobile-nav.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HashTagComponent } from './hash-tag/hash-tag.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { InterceptorService } from './interceptor.service';
import { JoinedCommunityComponent } from './joined-community/joined-community.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MetaCardComponent } from './meta-card/meta-card.component';
import { QuestionUIComponent } from './question-ui/question-ui.component';
import { QuickNavComponent } from './quick-nav/quick-nav.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RichTextAreaComponent } from './rich-text-area/rich-text-area.component';
import { MessagingService } from './service/messaging.service';
import { CardComponent } from './shared/components/card/card.component';
import { CommunityCardMobileViewComponent } from './shared/components/community-card-mobile-view/community-card-mobile-view.component';
import { CommunityListComponent } from './shared/components/dialogs/community-list/community-list.component';
import { CreateCommunityComponent } from './shared/components/dialogs/create-community/create-community.component';
import { DescriptionComponent } from './shared/components/dialogs/description/description.component';
// import { ShareModule, ShareButtonsConfig } from '@ngx-share/core';
import { SharePostComponent } from './shared/components/dialogs/share-post/share-post.component';
import { UserListComponent } from './shared/components/dialogs/user-list/user-list.component';
import { ViewImageComponent } from './shared/components/dialogs/view-image/view-image.component';
import { DotComponent } from './shared/components/dot/dot.component';
import { MoreOptionComponent } from './shared/components/more-option/more-option.component';
import { RankCardComponent } from './shared/components/rank-card/rank-card.component';
import { CommunityCardLoaderComponent } from './shared/loaders/community-card-loader/community-card-loader.component';
import { CommunityListLoaderComponent } from './shared/loaders/community-list-loader/community-list-loader.component';
import { UserListLoaderComponent } from './shared/loaders/user-list-loader/user-list-loader.component';
import { SafePipe } from './shared/safe.pipe';
import { UserListViewComponent } from './shared/user-list-view/user-list-view.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { SponsoredComponent } from './sponsored/sponsored.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { TrendingComponent } from './trending/trending.component';
import { UserActivityComponent } from './user-activity/user-activity.component';
import { UserProfileCardComponent } from './user-profile-card/user-profile-card.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function metaFactory(): MetaLoader {
  return new MetaStaticLoader({
    callback: (key: string) => {
      return key;
    },
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' | ',
    applicationName: GlobalConstants.siteTitle,
    defaults: {
      "title": GlobalConstants.siteTitle,
      "description": GlobalConstants.description,
      'author': GlobalConstants.siteTitle,
      'robots': 'index, follow, max-image-preview:standard',
      "googlebot": "index, follow, max-image-preview:standard",
      'og:image': GlobalConstants.image,
      'og:type': 'website',
      'og:locale': 'en_US',
      'og:url': GlobalConstants.siteLink,
      'fb:app_id': GlobalConstants.fbAppId,
      'twitter:title': GlobalConstants.siteTitle,
      'twitter:description': GlobalConstants.description,
      "twitter:url": GlobalConstants.siteLink,
      "twitter:image": GlobalConstants.siteLogoExternalLink
    }
  });
}

@NgModule({
  declarations: [
    AppComponent,
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
    SidenavComponent,
    PostFeedComponent,
    FeedsLoaderComponent,
    CardComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    RankCardComponent,
    CommunityComponent,
    CreateCommunityComponent,
    MoreOptionComponent,
    DescriptionComponent,
    SuggestionComponent,
    SponsoredComponent,
    UsercommunityComponent,
    TrendingComponent,
    CommunityUsersComponent,
    UserProfileCardComponent,
    CommentBoxComponent,
    DragDropDirective,
    UserProfilePageComponent,
    SinglePostComponent,
    UserActivityComponent,
    SharePostComponent,
    MetaCardComponent,
    UserListComponent,
    CommunityListComponent,
    ViewImageComponent,
    CommunityListLoaderComponent,
    CommunityCardLoaderComponent,
    UserListLoaderComponent,
    MetaCardComponent,
    UserListViewComponent,
    SafePipe,
    HashTagComponent,
    DotComponent,
    CommunityCardMobileViewComponent,
    JoinedCommunityComponent,
    FeedTextComponent,
    RelationActionButtonComponent,
    CommunityRelationActionButtonComponent,
    WelcomeSlidesComponent,
    ExploreComponent,
    QuickNavComponent,
    CreateCommunityBtnComponent,
    ForgotPasswordComponent,
    SignUpPageComponent,
    LoginPageComponent,
    ResetPasswordComponent,
    FloatingMobileNavComponent,
    CompanyFooterSpanComponent,
    EditUserComponent,
    UserDescriptionCardComponent,
    EmoticonsComponent,
    OtpVerificationComponent,
    ImgCropperComponent,
    ImgCropperWrapperComponent,
    ErrorPageComponent,
    FloatingCommunitiesBarComponent,
    CommunityBannerComponent,
    AdsenseComponent,
    FloatingSuggestionBoxComponent,
    RichTextAreaComponent,
    PostMenuOptionsComponent,
    PostFeedComponent,
    PostReportComponent,
    QuestionUIComponent,
    TrendingPostPollQuestionComponent,
    BlogTitleComponent,
    LoginRegisterBtnComponent,
    AttachedFileComponent,
    AttachedFileListComponent,
    ConfirmDialogComponent,
    RichTextComponent,
    CommunitySuggestionGuideComponent,
    InfoTooltipComponent,
    CustomTooltipComponent,
    LoginSignupTabComponent,
    LoginSignupModalComponent,
    MediaContainerComponent,
    FullScreenMediaComponent,
    UserActivityBarComponent,
    CommunityActivityComponent,
    HorizontalOwnerProfileComponent,
    NavBarComponent,
    AskQuestionComponent,
    AskQuestionBtnComponent,
    SocialMediaLinksComponent,
    CompanyRightsFooterComponent,
    KnowMoreLinkComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    CarouselModule,
    HttpClientModule,
    SocialLoginModule,
    ShareButtonsModule.withConfig(customConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ClipboardModule,
    DynamicHTMLModule.forRoot({
      components: [
        { component: HashTagComponent, selector: 'app-hash-tag' }
      ]
    }),
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: (metaFactory),
      deps: []
    }),
    PickerModule,
    ImageCropperModule,
    MDBBootstrapModule.forRoot(),
    CKEditorModule,
    QuillModule.forRoot(),
    FAQModule
  ],
  entryComponents: [
    CreateCommunityComponent,
    DescriptionComponent,
    UserListComponent,
    MetaCardComponent,
    WelcomeSlidesComponent,
    PostFeedComponent,
    AskQuestionComponent
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
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    MessagingService,
    CommunityResolve,
    LandingPageResolve,
    SinglePostResolve,
    {
      provide: MatDialogRef,
      useValue: []
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: []
    },
    GlobalService,
    FullScreenMediaService
  ],
  exports: [
    JoinedCommunityComponent,
    FeedTextComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
