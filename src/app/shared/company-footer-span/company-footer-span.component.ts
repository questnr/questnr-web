import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'shared/constants';

@Component({
  selector: 'app-company-footer-span',
  templateUrl: './company-footer-span.component.html',
  styleUrls: ['./company-footer-span.component.scss']
})
export class CompanyFooterSpanComponent implements OnInit {
  siteTitle: string = GlobalConstants.siteTitle;
  termsPath: string = GlobalConstants.termsPath;
  policyPath: string = GlobalConstants.policyPath;
  supportEmail: string = GlobalConstants.supportEmail;
  siteLink: string = GlobalConstants.siteLink;

  constructor() { }

  ngOnInit(): void {
  }

}
