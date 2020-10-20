import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './single-post.common';

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SinglePostRoutingModule { }