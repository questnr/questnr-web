import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {routes} from './app.routes';

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      onSameUrlNavigation: 'reload'
      // enableTracing: true // <-- debugging purposes only
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }