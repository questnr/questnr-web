import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedsComponent } from './feeds/feeds.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { SidenavComponent } from './sidenav/sidenav.component';



@NgModule({
  declarations: [UserHeaderComponent, SidenavComponent],
  imports: [
    CommonModule,
  ]
})
export class FeedsFrameModule { }
