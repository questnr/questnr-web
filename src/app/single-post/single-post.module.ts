import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { SinglePostRoutingModule } from './single-post-routing.module';
import { componentDeclarations, providerDeclarations } from './single-post.common';
import { SinglePostComponent } from './single-post.component';

@NgModule({
  imports: [
    CommonModule,
    SinglePostRoutingModule,
    SharedModule
  ],
  declarations: [
    ...componentDeclarations
  ],
  providers: [
    ...providerDeclarations
  ],
  exports: [
    SinglePostComponent
  ],
  bootstrap: [SinglePostComponent]
})
export class SinglePostModule { }
