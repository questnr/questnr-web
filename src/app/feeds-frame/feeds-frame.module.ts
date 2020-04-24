import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHeaderComponent } from './user-header/user-header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { FeedsService } from './feeds.service';


@NgModule({
  declarations: [UserHeaderComponent, SidenavComponent, PostFeedComponent],
  imports: [CommonModule],
  providers: [FeedsService]
})
export class FeedsFrameModule { }
