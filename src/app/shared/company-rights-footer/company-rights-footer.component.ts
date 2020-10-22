import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../constants';

@Component({
  selector: 'app-company-rights-footer',
  templateUrl: './company-rights-footer.component.html',
  styleUrls: ['./company-rights-footer.component.scss']
})
export class CompanyRightsFooterComponent implements OnInit {
  copyRightRenewedYear = GlobalConstants.copyRightRenewedYear;
  constructor() { }

  ngOnInit(): void {
  }

}
