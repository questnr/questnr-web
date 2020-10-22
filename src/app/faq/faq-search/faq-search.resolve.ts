import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { GlobalConstants } from '../../shared/constants';
import { UIService } from '../../ui/ui.service';

@Injectable()
export class FaqSearchResolve implements Resolve<void> {

  constructor(private uiService: UIService) { }

  resolve(route: ActivatedRouteSnapshot): void {
    return this.uiService.setDetault(GlobalConstants.questnrHelpTitle);
  }
}
