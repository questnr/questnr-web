import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachedFileComponent } from './attached-file/attached-file.component';
import { AttachedFileListComponent } from './attached-file-list.component';
import { AppMaterialModule } from 'app-material/app-material.module';

@NgModule({
  declarations: [
    AttachedFileComponent,
    AttachedFileListComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    AttachedFileComponent,
    AttachedFileListComponent
  ]
})
export class AttachedFileModule { }
