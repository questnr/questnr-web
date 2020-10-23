import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule } from '@nativescript/angular';
import { CarouselModule } from 'angular-bootstrap-md';
import { LoaderTextModule } from '../shared/loader-text/loader-text.module';
import { componentDeclarations, providerDeclarations } from './auth.common';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
    CarouselModule,
    ClipboardModule,
    LoaderTextModule
  ],
  declarations: [
    ...componentDeclarations
  ],
  providers: [
    ...providerDeclarations
  ],
  exports: [
    ...componentDeclarations
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AuthModule { }
