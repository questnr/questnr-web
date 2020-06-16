import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from 'shared/shared.module';
import { AppModule } from '../app.module';
import { FeedsService } from './feeds.service';
import { NotificationItemComponent } from './notification-item/notification-item.component';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { FeedsLoaderComponent } from './recommended-feeds/feeds-loader/feeds-loader.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UserHeaderComponent } from './user-header/user-header.component';


@NgModule({
  declarations: [
    UserHeaderComponent,
    SidenavComponent,
    PostFeedComponent,
    FeedsLoaderComponent,
    NotificationItemComponent,
    SharedModule
  ],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    AppModule
  ],
  providers: [
    FeedsService
  ],
  exports: [
  ]
})
export class FeedsFrameModule { }
