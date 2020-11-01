import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  private mobileView: boolean = false;
  screenWidth = window.innerWidth;

  constructor() {
    const width = this.screenWidth;
    if (width <= 900) {
      this.mobileView = true;
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 900 && width <= 1368) {
      this.mobileView = false;
    }
  }

  public isMobileView(): boolean {
    return this.mobileView;
  }
}
