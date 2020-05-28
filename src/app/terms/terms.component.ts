import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'shared/api.service';
import { LoginService } from '../auth/login.service';
import { GlobalConstants } from 'shared/constants';

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
  constructor(private router: Router, private api: ApiService, public loginService: LoginService) {
    this.policyLink = GlobalConstants.getPolicyLink();
  }

  goTo(val) {
    this.api.activeAuth = val;
    this.router.navigate(['/']);
  }
  ngOnInit() {
  }
}
