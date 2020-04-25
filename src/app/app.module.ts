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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CardComponent } from './shared/components/card/card.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupComponent } from './auth/signup/signup.component';
import { RankCardComponent } from './shared/components/rank-card/rank-card.component';
import { InterceptorService } from './interceptor.service';
// @ts-ignore
import { CarouselModule } from 'ngx-owl-carousel-o';
// @ts-ignore
import { AngularFireMessagingModule } from '@angular/fire/messaging';
// @ts-ignore
import { AngularFireDatabaseModule } from '@angular/fire/database';
// @ts-ignore
import { AngularFireAuthModule } from '@angular/fire/auth';
// @ts-ignore
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from './service/messaging.service';
import { AsyncPipe } from '../../node_modules/@angular/common';
import {
  SocialLoginModule, AuthServiceConfig,
  GoogleLoginProvider, FacebookLoginProvider
} from 'angularx-social-login';

import { environment } from '../environments/environment';

import { MnFullpageModule } from 'ngx-fullpage';
import { AuthGuard } from 'auth/auth.guard';
import { LoginService } from 'auth/login.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { CommunityComponent } from './community/community.component';
import {CreateCommunityComponent} from './shared/components/dialogs/create.community/create-community.component';
import { MoreOptionComponent } from './shared/components/more-option/more-option.component';
import { DescriptionComponent } from './shared/components/dialogs/description/description.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { SponseredComponent } from './sponsered/sponsered.component';
import { UsercommunityComponent } from './usercommunity/usercommunity.component';
import {MatDialogModule, MatSelectModule, MatTooltipModule} from '@angular/material';

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
export function HttpLoaderFactory(http: HttpClient){
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
    UsercommunityComponent
  ],
  imports: [
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    CarouselModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
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
    MatCheckboxModule,
    MatDialogModule,
    SocialLoginModule,
    MnFullpageModule.forRoot(),
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatSelectModule,
    MatTooltipModule
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
