import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { AppMaterialModule } from 'app-material/app-material.module';
import { AttachedFileModule } from 'attached-file-list/attached-file.module';
import { AuthModule } from 'auth/auth.module';
import { BlogTitleComponent } from 'blog-title/blog-title.component';
import { CommonService } from 'common/common.service';
import { SnackBarService } from 'common/snackbar.service';
import { DynamicHTMLModule } from 'dynamic-html';
import { EmoticonsComponent } from 'emoticons/emoticons.component';
import { FeedTextComponent } from 'feed-text/feed-text.component';
import { NotificationItemComponent } from 'feeds-frame/notification-item/notification-item.component';
import { PostMenuOptionsComponent } from 'feeds-frame/post-menu-options/post-menu-options.component';
import { CommentBoxComponent } from 'feeds-frame/recommended-feeds/comment-box/comment-box.component';
import { UserHeaderComponent } from 'feeds-frame/user-header/user-header.component';
import { HashTagComponent } from 'hash-tag/hash-tag.component';
import { HorizontalProfileComponent } from 'horizontal-profile/horizontal-profile.component';
import { MediaContainerComponent } from 'media-container/media-container.component';
import { MetaCardComponent } from 'meta-card/meta-card.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { QuillModule } from 'ngx-quill';
import { QuestionUIComponent } from 'question-ui/question-ui.component';
import { RichTextComponent } from 'rich-text/rich-text.component';
import { SearchOverlayComponent } from 'search/search-overlay/search-overlay.component';
import { SearchedEntityListComponent } from 'searched-entity-list/searched-entity-list.component';
import { TimeStringComponent } from 'time-string/time-string.component';
import { UsernameComponent } from 'username/username.component';
import { KnowMoreLinkComponent } from './components/know-more-link/know-more-link.component';
import { LoaderModule } from './loader-text/loader.module';
import { ProfileIconComponent } from './profile-icon/profile-icon.component';
import { SignInRequiredModalComponent } from './sign-in-required-modal/sign-in-required-modal.component';
import { SignInRequiredComponent } from './sign-in-required-modal/sign-in-required/sign-in-required.component';
import { ViewMoreButtonComponent } from './view-more-button/view-more-button.component';
import { PostNotificationButtonComponent } from './post-notification-button/post-notification-button.component';
import { PostNotificationContainerComponent } from './post-notification-container/post-notification-container.component';
import { ActionMenuComponent } from './action-menu/action-menu.component';

@NgModule({
  declarations: [
    ViewMoreButtonComponent,
    UserHeaderComponent,
    SearchOverlayComponent,
    SearchedEntityListComponent,
    ProfileIconComponent,
    NotificationItemComponent,
    TimeStringComponent,
    UsernameComponent,
    HorizontalProfileComponent,
    QuestionUIComponent,
    CommentBoxComponent,
    FeedTextComponent,
    MediaContainerComponent,
    BlogTitleComponent,
    PostMenuOptionsComponent,
    MetaCardComponent,
    RichTextComponent,
    EmoticonsComponent,
    KnowMoreLinkComponent,
    SignInRequiredModalComponent,
    SignInRequiredComponent,
    PostNotificationButtonComponent,
    PostNotificationContainerComponent,
    ActionMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    ClipboardModule,
    DynamicHTMLModule.forRoot({
      components: [
        { component: HashTagComponent, selector: 'app-hash-tag' }
      ]
    }),
    QuillModule.forRoot(),
    PickerModule,
    AuthModule,
    AttachedFileModule,
    LoaderModule
  ],
  entryComponents: [
    MetaCardComponent,
    TimeStringComponent
  ],
  exports: [
    RouterModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    ClipboardModule,
    DynamicHTMLModule,
    QuillModule,
    PickerModule,
    AuthModule,
    AttachedFileModule,
    LoaderModule,
    ViewMoreButtonComponent,
    UserHeaderComponent,
    SearchOverlayComponent,
    SearchedEntityListComponent,
    ProfileIconComponent,
    NotificationItemComponent,
    TimeStringComponent,
    UsernameComponent,
    HorizontalProfileComponent,
    QuestionUIComponent,
    CommentBoxComponent,
    FeedTextComponent,
    MediaContainerComponent,
    BlogTitleComponent,
    PostMenuOptionsComponent,
    MetaCardComponent,
    RichTextComponent,
    EmoticonsComponent,
    KnowMoreLinkComponent,
    SignInRequiredModalComponent,
    SignInRequiredComponent,
    PostNotificationButtonComponent,
    PostNotificationContainerComponent,
    ActionMenuComponent
  ],
  providers: [
    CommonService,
    SnackBarService
  ],
  bootstrap: [
    UserHeaderComponent
  ]
})
export class SharedModule { }
