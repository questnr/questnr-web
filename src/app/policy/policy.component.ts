import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'shared/api.service';
import { LoginService } from '../auth/login.service';
import { GlobalConstants } from 'shared/constants';

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
  constructor(private router: Router, private api: ApiService, public loginService: LoginService) { }

  goTo(val) {
    this.api.activeAuth = val;
    this.router.navigate(['/']);
  }
  ngOnInit() {
  }
}
