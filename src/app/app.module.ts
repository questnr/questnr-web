import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {
  MatButtonModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatTabsModule
} from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CardComponent } from './shared/components/card/card.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupComponent } from './auth/signup/signup.component';
import { RankCardComponent } from './shared/components/rank-card/rank-card.component';
import { InterceptorService } from './interceptor.service';

import {
  SocialLoginModule, AuthServiceConfig,
  GoogleLoginProvider, FacebookLoginProvider
} from 'angularx-social-login';

import { environment } from '../environments/environment';

import { MnFullpageModule } from 'ngx-fullpage';

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
@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    CardComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    RankCardComponent
  ],
  imports: [
    BrowserModule,
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
    SocialLoginModule,
    MnFullpageModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
