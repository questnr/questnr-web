import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from 'app-material/app-material.module';
import { ViewMoreButtonComponent } from './view-more-button/view-more-button.component';
import { UserHeaderComponent } from 'feeds-frame/user-header/user-header.component';
import { SearchOverlayComponent } from 'search/search-overlay/search-overlay.component';
import { SearchedEntityListComponent } from 'searched-entity-list/searched-entity-list.component';
import { ProfileIconComponent } from './profile-icon/profile-icon.component';
import { LoaderTextComponent } from './loader-text/loader-text.component';
import { LoaderComponent } from './loader/loader.component';
import { NotificationItemComponent } from 'feeds-frame/notification-item/notification-item.component';
import { TimeStringComponent } from 'time-string/time-string.component';
import { UsernameComponent } from 'username/username.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HorizontalProfileComponent } from 'horizontal-profile/horizontal-profile.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ViewMoreButtonComponent,
    UserHeaderComponent,
    SearchOverlayComponent,
    SearchedEntityListComponent,
    ProfileIconComponent,
    LoaderComponent,
    LoaderTextComponent,
    NotificationItemComponent,
    TimeStringComponent,
    UsernameComponent,
    HorizontalProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [

  ],
  exports: [
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ViewMoreButtonComponent,
    UserHeaderComponent,
    SearchOverlayComponent,
    SearchedEntityListComponent,
    ProfileIconComponent,
    LoaderComponent,
    LoaderTextComponent,
    NotificationItemComponent,
    TimeStringComponent,
    UsernameComponent,
    HorizontalProfileComponent
  ]
})
export class SharedModule { }
