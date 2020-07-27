import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'shared/api.service';
import { LoginService } from '../auth/login.service';
import { GlobalConstants } from 'shared/constants';
import { UIService } from 'ui/ui.service';

@Component({
  templateUrl: './cookie-policy.component.html',
  styleUrls: ['./cookie-policy.component.scss']
})
export class CookiePolicyComponent implements OnInit {
  siteTitle: string = GlobalConstants.siteTitle;
  helloEmail: string = GlobalConstants.helloEmail;
  policyLink: string;
  siteLink: string = GlobalConstants.siteLink;
  addressLine1: string = GlobalConstants.addressLine1;
  termsLastUpdated: string = GlobalConstants.termsLastUpdated;
  constructor(private uiService: UIService, private router: Router, private api: ApiService, public loginService: LoginService) {
    this.uiService.setTitle(GlobalConstants.cookiePolicyTitle);
  }

  goTo(val) {
    this.api.activeAuth = val;
    this.router.navigate(['/']);
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.uiService.resetTitle();
  }
}
