import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule } from '@nativescript/angular';
import { CarouselModule } from 'angular-bootstrap-md';
import { QuillModule } from 'ngx-quill';
import { AttachedFileModule } from '../attached-file/attached-file.module';
import { AuthModule } from '../auth/auth.module';
import { DynamicHTMLModule } from '../dynamic-html';
import { UserHeaderComponent } from '../feeds-frame/user-header/user-header.component';
import { HashTagComponent } from '../hash-tag/hash-tag.component';
import { MetaCardComponent } from '../meta-card/meta-card.component';
import { TimeStringComponent } from '../time-string/time-string.component';
import { LoaderTextModule } from './loader-text/loader-text.module';
import { componentDeclarations, providerDeclarations } from './shared.common';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
    CarouselModule,
    ClipboardModule,
    DynamicHTMLModule.forRoot({
      components: [
        { component: HashTagComponent, selector: 'app-hash-tag' }
      ]
    }),
    QuillModule.forRoot(),
    PickerModule,
    AuthModule,
    AttachedFileModule,
    LoaderTextModule
  ],
  declarations: [
  ...componentDeclarations
  ],
  providers: [
  ...providerDeclarations
  ],
  exports: [
    NativeScriptFormsModule,
    ReactiveFormsModule,
    CarouselModule,
    ClipboardModule,
    DynamicHTMLModule.forRoot({
      components: [
        { component: HashTagComponent, selector: 'app-hash-tag' }
      ]
    }),
    QuillModule.forRoot(),
    PickerModule,
    AuthModule,
    AttachedFileModule,
    LoaderTextModule,
    ...componentDeclarations
  ],
  entryComponents: [
    MetaCardComponent,
    TimeStringComponent
  ],
  bootstrap: [
    UserHeaderComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class SharedModule { }
