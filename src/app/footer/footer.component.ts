import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { GlobalConstants } from '../shared/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['../landing-page/landing-page.component.scss', './footer.component.scss']
})
export class FooterComponent implements OnInit {
  siteTitle: string = GlobalConstants.siteTitle;
  termsPath: string = GlobalConstants.termsPath;
  policyPath: string = GlobalConstants.policyPath;
  supportEmail: string = GlobalConstants.supportEmail;
  copyRightRenewedYear = GlobalConstants.copyRightRenewedYear;
  siteLink: string = GlobalConstants.siteLink;
  mobileView: boolean = false;

  constructor(private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }
}
