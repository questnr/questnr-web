import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'community-privacy-template',
  templateUrl: './community-privacy.component.html',
  styleUrls: ['./community-privacy.component.scss', '../../faq.component.scss']
})
export class CommunityPrivacyComponent implements OnInit {
  mobileView: boolean = false;

  constructor(private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

}
