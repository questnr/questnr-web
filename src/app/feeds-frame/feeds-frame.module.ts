import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHeaderComponent } from './user-header/user-header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { FeedsService } from './feeds.service';
import { FeedsLoaderComponent } from './recommended-feeds/feeds-loader/feeds-loader.component';
import { NotificationItemComponent } from './notification-item/notification-item.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AppModule } from '../app.module';
import { SharedModule } from 'shared/shared.module';


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
  ]
})
export class FeedsFrameModule { }
