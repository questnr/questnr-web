import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CardComponent } from './shared/components/card/card.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupComponent } from './auth/signup/signup.component';
import { RankCardComponent } from './shared/components/rank-card/rank-card.component';
import { InterceptorService } from './interceptor.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from './service/messaging.service';
import { AsyncPipe } from '../../node_modules/@angular/common';
import {
  SocialLoginModule, AuthServiceConfig,
  GoogleLoginProvider, FacebookLoginProvider
} from 'angularx-social-login';
import { MatVideoModule } from 'mat-video';
import { environment } from '../environments/environment';

import { AuthGuard } from 'auth/auth.guard';
import { LoginService } from 'auth/login.service';
// import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
// import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { CommunityComponent } from './community/community.component';
import { CreateCommunityComponent } from './shared/components/dialogs/create.community/create-community.component';
import { MoreOptionComponent } from './shared/components/more-option/more-option.component';
import { DescriptionComponent } from './shared/components/dialogs/description/description.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { SponseredComponent } from './sponsered/sponsered.component';
import { UsercommunityComponent } from './usercommunity/usercommunity.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TrendingComponent } from './trending/trending.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommunityUsersComponent } from './community-users/community-users.component';
import { UserProfileCardComponent } from './user-profile-card/user-profile-card.component';

// import {MatDialogModule, MatSelectModule, MatTooltipModule} from '@angular/material';
import { CommentBoxComponent } from './feeds-frame/recommended-feeds/comment-box/comment-box.component';
import { DragDropDirective } from 'drag-drop.directive';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { UserFollowersComponent } from './user-followers/user-followers.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { UserActivityComponent } from './user-activity/user-activity.component';
// import { ShareModule, ShareButtonsConfig } from '@ngx-share/core';
import { SharePostComponent } from './shared/components/dialogs/share-post/share-post.component';

import { ShareButtonsModule } from '@ngx-share/buttons';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ShareButtonsConfig } from '@ngx-share/core';
import { ClipboardModule } from '@angular/cdk/clipboard';


const customConfig: ShareButtonsConfig = {
  include: ['facebook', 'twitter', 'linkedin', 'whatsapp', 'email'],
  theme: 'circles-light',
  autoSetMeta: true,
};

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.googleKey)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.fbKey)
  }
]);
export function provideConfig() {
  return config;
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
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
    SponseredComponent,
    UsercommunityComponent,
    TrendingComponent,
    CommunityUsersComponent,
    UserProfileCardComponent,
    CommentBoxComponent,
    DragDropDirective,
    UserProfilePageComponent,
    UserFollowersComponent,
    SinglePostComponent,
    UserActivityComponent,
    SharePostComponent
  ],
  imports: [
    MatVideoModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule,
    MatSidenavModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatTabsModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    SocialLoginModule,
    ShareButtonsModule.withConfig(customConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatSelectModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    NgxSkeletonLoaderModule,
    ClipboardModule
  ],
  entryComponents: [
    CreateCommunityComponent,
    DescriptionComponent
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
    MessagingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
