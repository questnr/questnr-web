import { Component, OnInit, Input } from '@angular/core';
import { AdsenseConstants } from 'shared/constants/adsense-constants';
declare var window: any;

@Component({
  selector: 'app-adsense',
  templateUrl: './adsense.component.html',
  styleUrls: ['./adsense.component.scss']
})
export class AdsenseComponent implements OnInit {
  @Input() height: number;
  @Input() width: number;
  adClient: string = AdsenseConstants.adClient;

  constructor() {
    try {
      window._mNHandle.queue.push(function () {
        window._mNDetails.loadTag("822897141", "300x250", "822897141");
      });
    }
    catch (error) { }
  }

  ngOnInit(): void {
  }

}
