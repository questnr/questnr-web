import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ViewMoreButtonComponent } from 'src/app/shared/view-more-button/view-more-button.component';
import { UserHeaderComponent } from 'src/app/feeds-frame/user-header/user-header.component';
import { SearchOverlayComponent } from 'src/app/search/search-overlay/search-overlay.component';
import { SearchedEntityListComponent } from 'src/app/searched-entity-list/searched-entity-list.component';
import { ProfileIconComponent } from 'src/app/shared/profile-icon/profile-icon.component';
import { NotificationItemComponent } from 'src/app/feeds-frame/notification-item/notification-item.component';
import { TimeStringComponent } from 'src/app/time-string/time-string.component';
import { UsernameComponent } from 'src/app/username/username.component';
import { HorizontalProfileComponent } from 'src/app/horizontal-profile/horizontal-profile.component';
import { QuestionUIComponent } from 'src/app/question-ui/question-ui.component';
import { CommentBoxComponent } from 'src/app/feeds-frame/recommended-feeds/comment-box/comment-box.component';
import { FeedTextComponent } from 'src/app/feed-text/feed-text.component';
import { MediaContainerComponent } from 'src/app/media-container/media-container.component';
import { BlogTitleComponent } from 'src/app/blog-title/blog-title.component';
import { PostMenuOptionsComponent } from 'src/app/feeds-frame/post-menu-options/post-menu-options.component';
import { MetaCardComponent } from 'src/app/meta-card/meta-card.component';
import { RichTextComponent } from 'src/app/rich-text/rich-text.component';
import { EmoticonsComponent } from 'src/app/emoticons/emoticons.component';
import { KnowMoreLinkComponent } from 'src/app/shared/components/know-more-link/know-more-link.component';
import { SignInRequiredModalComponent } from 'src/app/shared/sign-in-required-modal/sign-in-required-modal.component';
import { SignInRequiredComponent } from 'src/app/shared/sign-in-required-modal/sign-in-required/sign-in-required.component';
import { PostNotificationButtonComponent } from 'src/app/shared/post-notification-button/post-notification-button.component';
import { PostNotificationContainerComponent } from 'src/app/shared/post-notification-container/post-notification-container.component';
import { ActionMenuComponent } from 'src/app/shared/action-menu/action-menu.component';
import { TrashIconComponent } from 'src/app/shared/trash-icon/trash-icon.component';
import { CreateCommentComponent } from 'src/app/feeds-frame/recommended-feeds/create-comment/create-comment.component';
import { CommonService } from 'common/common.service';
import { SnackBarService } from 'common/snackbar.service';

@NgModule({
  imports: [
    NativeScriptCommonModule
  ],
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
  ActionMenuComponent,
  TrashIconComponent,
  CreateCommentComponent],
  providers: [
  CommonService,
  SnackBarService],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class SharedModule { }
