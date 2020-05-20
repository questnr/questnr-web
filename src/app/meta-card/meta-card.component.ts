
import { Component, OnInit, Input } from '@angular/core';
import { IFramelyData } from 'models/iframely.model';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-meta-card',
  templateUrl: './meta-card.component.html',
  styleUrls: ['./meta-card.component.scss'],
})
export class MetaCardComponent implements OnInit {
  @Input() iFramelyData: IFramelyData;
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  setIFramelyData(iFramelyData: IFramelyData) {
    this.iFramelyData = iFramelyData;
  }
  openIframelyLink() {
    if (this.iFramelyData.url) window.open(this.iFramelyData.url, '_blank');
  }
  setMediaPlayer(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

