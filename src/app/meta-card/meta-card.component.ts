import { Component, OnInit, Input } from '@angular/core';
import { IFramelyService } from './iframely.service';
import { IFramelyData } from 'models/iframely.model';

@Component({
  selector: 'app-meta-card',
  templateUrl: './meta-card.component.html',
  styleUrls: ['./meta-card.component.scss']
})
export class MetaCardComponent implements OnInit {

  iFramelyData: IFramelyData;
  @Input()
  detectedLink: string;
  constructor(private iFramelyService: IFramelyService) { }

  ngOnInit(): void {
    if (this.detectedLink) {
      this.getIFramelyData();
    } else {
      this.resetIFramelyData();
    }
  }
  getIFramelyData() {
    if (!this.detectedLink) return;
    let iFramelyResp: any = this.iFramelyService.getIFramelyData(this.detectedLink);
    iFramelyResp.then((iFramelyData: IFramelyData) => {
      this.iFramelyData = iFramelyData;
    });
  }
  resetIFramelyData() {
    this.iFramelyData = null;
  }
  openIframelyLink() {
    if (this.iFramelyData.url) window.open(this.iFramelyData.url, '_blank');
  }
}
