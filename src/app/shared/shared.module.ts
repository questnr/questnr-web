import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { NativeScriptFormsModule } from '@nativescript/angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { QuillModule } from 'ngx-quill';
import { AppMaterialModule } from '../app-material/app-material.module';
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
    CommonModule,
    RouterModule,
    AppMaterialModule,
    NativeScriptFormsModule,
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
  entryComponents: [
    MetaCardComponent,
    TimeStringComponent
  ],
  exports: [
    RouterModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    ClipboardModule,
    DynamicHTMLModule,
    QuillModule,
    PickerModule,
    AuthModule,
    AttachedFileModule,
    LoaderTextModule,
    ...componentDeclarations
  ],
  bootstrap: [
    UserHeaderComponent
  ]
})
export class SharedModule { }
