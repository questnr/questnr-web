import { Component, OnInit, Input } from '@angular/core';
import { IFramelyService } from './iframely.service';
import { IFramelyData } from 'models/iframely.model';

@Component({
  selector: 'app-meta-card',
  templateUrl: './meta-card.component.html',
  styleUrls: ['./meta-card.component.scss']
})
export class MetaCardComponent implements OnInit {
  @Input() uniqueId: string;
  iFramelyData: IFramelyData = null;
  detectedLink: string;
  url: RegExp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  constructor(private iFramelyService: IFramelyService) { }

  ngOnInit(): void {
  }

  async parseTextToFindURL(text) {
    let urls, output = null;
    while ((urls = this.url.exec(text)) !== null) {
      output = urls[0];
      // console.log("URLS: " + output);
    }
    if (output) {
      await this.getIFramelyData(output);
    }
    else {
      this.resetIFramelyData();
    }
    // if (urls = this.url.exec(text) == null) {
    //   return null;
    // }
  }
  async getIFramelyData(detectedLink: string): Promise<void> {
    if (!detectedLink) return;
    this.iFramelyData = await this.iFramelyService.getIFramelyData(detectedLink);
  }
  resetIFramelyData() {
    this.iFramelyData = null;
  }
  openIframelyLink() {
    if (this.iFramelyData.url) { window.open(this.iFramelyData.url, '_blank'); }
  }
}
