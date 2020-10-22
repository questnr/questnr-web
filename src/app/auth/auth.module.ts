import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'angular-bootstrap-md';
import { AppMaterialModule } from '../app-material/app-material.module';
import { LoaderModule } from '../shared/loader-text/loader.module';
import { componentDeclarations, providerDeclarations } from './auth.common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    ClipboardModule,
    LoaderModule
  ],
  declarations: [
    ...componentDeclarations
  ],
  providers: [
    ...providerDeclarations
  ],
  exports: [
    ...componentDeclarations
  ]
})
export class AuthModule { }
