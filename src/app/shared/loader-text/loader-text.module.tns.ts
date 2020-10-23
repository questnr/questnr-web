import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { LoaderTextComponent } from './loader-text.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [
    NativeScriptCommonModule
  ],
  declarations: [
    LoaderComponent,
    LoaderTextComponent
  ],
  providers: [

  ],
  exports: [
    LoaderComponent,
    LoaderTextComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class LoaderTextModule { }
