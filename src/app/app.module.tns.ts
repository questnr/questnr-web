import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';

import { AppRoutingModule } from './app-routing.module.tns';
import { AppComponent } from './app.component';

import { FeedsFrameComponent } from './feeds-frame/feeds-frame.component';
import { AskQuestionBtnComponent } from './ask-question-btn/ask-question-btn.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CommunityComponent } from './community/community.component';
import { HorizontalOwnerProfileComponent } from './community/horizontal-owner-profile/horizontal-owner-profile.component';
import { CommunityHorizontalCardComponent } from './community/community-horizontal-card/community-horizontal-card.component';
import { CommunityActivityComponent } from './community-activity/community-activity.component';
import { CommunityBoxComponent } from './community-box/community-box.component';
import { CommunityRelationActionButtonComponent } from './community-relation-action-button/community-relation-action-button.component';
import { NoCommunityComponent } from './community-box/no-community/no-community.component';
import { CommunityLoaderComponent } from './community-box/community-loader/community-loader.component';
import { CommunitySuggestionGuideComponent } from './community-suggestion-guide/community-suggestion-guide.component';
import { CommunityUsersComponent } from './community-users/community-users.component';
import { NoCommunityMembersComponent } from './community-users/no-community-members/no-community-members.component';
import { ConfirmDialogComponent } from './confirm-dialog-modal/confirm-dialog/confirm-dialog.component';
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { CreateCommunityBtnComponent } from './create-community-btn/create-community-btn.component';
import { CustomTooltipComponent } from './custom-tooltip/custom-tooltip.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ExploreComponent } from './explore/explore.component';
import { FloatingAdsComponent } from './feeds-frame/floating-ads/floating-ads.component';
import { FloatingFooterComponent } from './feeds-frame/floating-footer/floating-footer.component';
import { PostFeedComponent } from './feeds-frame/post-feed/post-feed.component';
import { PostReportComponent } from './feeds-frame/post-report/post-report.component';
import { ProfileRibbonComponent } from './feeds-frame/profile-ribbon/profile-ribbon.component';
import { RecommendedFeedsComponent } from './feeds-frame/recommended-feeds/recommended-feeds.component';
import { FeedsLoaderComponent } from './feeds-frame/recommended-feeds/feeds-loader/feeds-loader.component';
import { SidenavComponent } from './feeds-frame/sidenav/sidenav.component';
import { FloatingCommunitiesBarComponent } from './floating-communities-bar/floating-communities-bar.component';
import { FloatingMobileNavComponent } from './floating-mobile-nav/floating-mobile-nav.component';
import { FloatingSuggestionBoxComponent } from './floating-suggestion-box/floating-suggestion-box.component';
import { HashTagComponent } from './hash-tag/hash-tag.component';
import { ImgCropperWrapperComponent } from './img-cropper-wrapper/img-cropper-wrapper.component';
import { ImgCropperComponent } from './img-cropper-wrapper/img-cropper/img-cropper.component';
import { InfoTooltipComponent } from './info-tooltip/info-tooltip.component';
import { JoinedCommunityComponent } from './joined-community/joined-community.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FullScreenMediaComponent } from './media-container/full-screen-media/full-screen-media.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PolicyComponent } from './policy/policy.component';
import { QuickNavComponent } from './quick-nav/quick-nav.component';
import { RelationActionButtonComponent } from './relation-action-button/relation-action-button.component';
import { RichTextAreaComponent } from './rich-text-area/rich-text-area.component';
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
import { LoaderTextComponent } from './shared/loader-text/loader-text.component';
import { LoaderComponent } from './shared/loader-text/loader/loader.component';
import { UserListLoaderComponent } from './shared/loaders/user-list-loader/user-list-loader.component';
import { CommunityListLoaderComponent } from './shared/loaders/community-list-loader/community-list-loader.component';
import { CommunityCardLoaderComponent } from './shared/loaders/community-card-loader/community-card-loader.component';
import { UserDescriptionCardComponent } from './shared/user-description-card/user-description-card.component';
import { UserListViewComponent } from './shared/user-list-view/user-list-view.component';
import { SponsoredComponent } from './sponsored/sponsored.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { TermsComponent } from './terms/terms.component';
import { TrendingComponent } from './trending/trending.component';
import { TrendPostQuestionComponent } from './trend-post-question/trend-post-question.component';
import { UserActivityComponent } from './user-activity/user-activity.component';
import { UserActivityBarComponent } from './user-activity/user-activity-bar/user-activity-bar.component';
import { UserProfileCardComponent } from './user-profile-card/user-profile-card.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { UserQuestionListComponent } from './user-question-list/user-question-list.component';
import { NoUserQuestionComponent } from './user-question-list/no-user-question/no-user-question.component';
import { UserQuestionComponent } from './user-question-list/user-question/user-question.component';
import { UserQuestionListModalComponent } from './user-question-list/user-question-list-modal/user-question-list-modal.component';
import { UserQuestionLoaderComponent } from './user-question-list/user-question-loader/user-question-loader.component';
import { UsercommunityComponent } from './usercommunity/usercommunity.component';

// Uncomment and add to NgModule imports if you need to use two-way binding and/or HTTP wrapper
import { NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';

@NgModule({
  declarations: [
    AppComponent,
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
    LoaderTextComponent,
    LoaderComponent,
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
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
