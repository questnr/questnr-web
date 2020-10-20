import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private mobileView = false;

  public isMobileView(): boolean {
    return this.mobileView;
  }

  setMobileView(mobileView: boolean): void {
    this.mobileView = mobileView;
  }
}
