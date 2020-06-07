import { Component, OnInit, Input } from '@angular/core';
import { GoogleAdsenseConstants } from 'shared/constants/google-adsense-constants';

@Component({
  selector: 'app-adsense',
  templateUrl: './adsense.component.html',
  styleUrls: ['./adsense.component.scss']
})
export class AdsenseComponent implements OnInit {
  @Input() height: number;
  @Input() width: number;
  adClient: string = GoogleAdsenseConstants.adClient;

  constructor() { }

  ngOnInit(): void {
  }

}
