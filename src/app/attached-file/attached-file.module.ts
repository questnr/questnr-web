import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from '../app-material/app-material.module';
import { componentDeclarations, providerDeclarations } from './attached-file.common';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule
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
export class AttachedFileModule { }
