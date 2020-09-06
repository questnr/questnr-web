import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { SinglePostRoutingModule } from './single-post-routing.module';
import { SinglePostComponent } from './single-post.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';

@NgModule({
  declarations: [SinglePostComponent, NotAuthorizedComponent],
  imports: [
    CommonModule,
    SinglePostRoutingModule,
    SharedModule
  ],
  exports: [
    SinglePostComponent
  ],
  bootstrap: [SinglePostComponent]
})
export class SinglePostModule { }
