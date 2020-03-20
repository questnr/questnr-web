import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {MatSliderModule} from "@angular/material/slider";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
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
import {MatMenuModule} from "@angular/material/menu";
import { LandingPageComponent } from './landing-page/landing-page.component';
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    routingComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
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
        MatCheckboxModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
