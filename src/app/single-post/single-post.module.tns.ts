import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import {componentDeclarations, providerDeclarations} from './single-post.common';

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
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class SinglePostModule { }
