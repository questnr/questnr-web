import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { componentDeclarations, providerDeclarations } from './attached-file.common';

@NgModule({
  imports: [
    NativeScriptCommonModule
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
export class AttachedFileModule { }
