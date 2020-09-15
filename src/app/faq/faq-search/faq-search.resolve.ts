import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { UIService } from 'ui/ui.service';

@Injectable()
export class FAQSearchResolve implements Resolve<void> {

  constructor(private uiService: UIService) { }

  resolve(route: ActivatedRouteSnapshot): void {
    return this.uiService.setDetault();
  }
}