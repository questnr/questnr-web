import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { GlobalConstants } from '../../shared/constants';
import { UIService } from '../../ui/ui.service';

@Injectable()
export class RecommendedFeedsResolve implements Resolve<void> {

  constructor(private uiService: UIService) { }

  resolve(route: ActivatedRouteSnapshot): void {
    this.uiService.setDetault(GlobalConstants.questnrFeedTitle);
  }
}
