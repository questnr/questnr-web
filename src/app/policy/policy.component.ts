import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'shared/api.service';
import { GlobalConstants } from 'shared/constants';
import { UIService } from 'ui/ui.service';
import { LoginService } from '../auth/login.service';

@Component({
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})

export class PolicyComponent implements OnInit {
  cookiePath = GlobalConstants.cookiePath;
  siteTitle: string = GlobalConstants.siteTitle;
  helloEmail: string = GlobalConstants.helloEmail;
  policyLink: string;
  siteLink: string = GlobalConstants.siteLink;
  addressLine1: string = GlobalConstants.addressLine1;
  privacyLastUpdated: string = GlobalConstants.privacyLastUpdated;
  contactPath: string = GlobalConstants.siteLink + GlobalConstants.contactPath;
  constructor(private uiService: UIService, private router: Router, private api: ApiService, public loginService: LoginService) {
    this.uiService.setTitle(GlobalConstants.policyTitle);
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
