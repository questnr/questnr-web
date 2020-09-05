import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderTextComponent } from './loader-text.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    LoaderComponent,
    LoaderTextComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    LoaderTextComponent
  ]
})
export class LoaderModule { }
