import { Routes } from '@angular/router';
import { BlogTitleComponent } from '../blog-title/blog-title.component';
import { CommonService } from '../common/common.service';
import { SnackBarService } from '../common/snackbar.service';
import { EmoticonsComponent } from '../emoticons/emoticons.component';
import { FeedTextComponent } from '../feed-text/feed-text.component';
import { NotificationItemComponent } from '../feeds-frame/notification-item/notification-item.component';
import { PostMenuOptionsComponent } from '../feeds-frame/post-menu-options/post-menu-options.component';
import { CommentBoxComponent } from '../feeds-frame/recommended-feeds/comment-box/comment-box.component';
import { CreateCommentComponent } from '../feeds-frame/recommended-feeds/create-comment/create-comment.component';
import { UserHeaderComponent } from '../feeds-frame/user-header/user-header.component';
import { HorizontalProfileComponent } from '../horizontal-profile/horizontal-profile.component';
import { MediaContainerComponent } from '../media-container/media-container.component';
import { MetaCardComponent } from '../meta-card/meta-card.component';
import { QuestionUIComponent } from '../question-ui/question-ui.component';
import { RichTextComponent } from '../rich-text/rich-text.component';
import { SearchOverlayComponent } from '../search/search-overlay/search-overlay.component';
import { SearchedEntityListComponent } from '../searched-entity-list/searched-entity-list.component';
import { TimeStringComponent } from '../time-string/time-string.component';
import { UsernameComponent } from '../username/username.component';
import { ActionMenuComponent } from './action-menu/action-menu.component';
import { ApiService } from './api.service';
import { KnowMoreLinkComponent } from './components/know-more-link/know-more-link.component';
import { PostNotificationButtonComponent } from './post-notification-button/post-notification-button.component';
import { PostNotificationContainerComponent } from './post-notification-container/post-notification-container.component';
import { ProfileIconComponent } from './profile-icon/profile-icon.component';
import { SignInRequiredModalComponent } from './sign-in-required-modal/sign-in-required-modal.component';
import { SignInRequiredComponent } from './sign-in-required-modal/sign-in-required/sign-in-required.component';
import { TrashIconComponent } from './trash-icon/trash-icon.component';
import { ViewMoreButtonComponent } from './view-more-button/view-more-button.component';

export const componentDeclarations: any[] = [
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
    CreateCommentComponent
];

export const providerDeclarations: any[] = [
  CommonService,
  SnackBarService,
  ApiService
];

export const routes: Routes = [
];
