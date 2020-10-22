import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../auth/login.service';
import { ApiService } from '../shared/api.service';
import { GlobalConstants } from '../shared/constants';
import { UIService } from '../ui/ui.service';

@Component({
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  siteTitle: string = GlobalConstants.siteTitle;
  helloEmail: string = GlobalConstants.helloEmail;
  policyLink: string;
  siteLink: string = GlobalConstants.siteLink;
  addressLine1: string = GlobalConstants.addressLine1;
  termsLastUpdated: string = GlobalConstants.termsLastUpdated;
  constructor(private uiService: UIService, private router: Router, private api: ApiService, public loginService: LoginService) {
    this.policyLink = GlobalConstants.getPolicyLink();
    this.uiService.setTitle(GlobalConstants.termsOfUseTitle);
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
