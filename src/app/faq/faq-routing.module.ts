import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './faq-routing.module.routes';

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FaqRoutingModule { }