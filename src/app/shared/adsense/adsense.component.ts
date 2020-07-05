import { Component, OnInit, Input } from '@angular/core';
import { AdsenseConstants } from 'shared/constants/adsense-constants';
import { GlobalConstants } from 'shared/constants';
declare var window: any;
declare var $: any;

@Component({
  selector: 'app-adsense',
  templateUrl: './adsense.component.html',
  styleUrls: ['./adsense.component.scss']
})
export class AdsenseComponent implements OnInit {
  @Input() height: number;
  @Input() width: number;
  adClient: string = AdsenseConstants.adClient;
  communityPath: string = GlobalConstants.communityPath;
  communityBeingSponsored: string = "psychology--5893190911159644679";
  communityWebsiteLink: string = "https://instagram.com/simplyinpsyche?igshid=1t5behpnrdosu";

  constructor() {
  }

  ngOnInit(): void {
    $(".poster-container").hover(function () {
      $(".poster-link-container").slideDown("slow");
    }, function () {
      $(".poster-link-container").slideUp("slow");
    });
  }

}
