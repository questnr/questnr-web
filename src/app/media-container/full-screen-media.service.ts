import { Injectable } from '@angular/core';
import { GlobalService } from 'global.service';

@Injectable({
  providedIn: 'root',
})
export class FullScreenMediaService {
  wrapper: HTMLElement;
  mediaContainer: HTMLElement;
  closeButtonDiv: HTMLElement;
  showing: boolean = false;

  constructor(private _globalService: GlobalService) { }

  open(mediaSrc: string) {
    if (!this.showing) {
      this.wrapper = document.createElement("div");
      this.wrapper.className = "full-screen-media-wrapper";
      this.closeButtonDiv = document.createElement("div");
      this.closeButtonDiv.className = "close";
      this.closeButtonDiv.onclick = () => {
        this.close();
      }
      this.closeButtonDiv.innerHTML = "<img src='/assets/close.svg' />";
      this.wrapper.appendChild(this.closeButtonDiv);

      this.mediaContainer = document.createElement("div");
      this.mediaContainer.className = "full-screen-media-container";
      if (this._globalService.isMobileView()) {
        this.mediaContainer.className += " mobile";
      } else {
        this.mediaContainer.className += " desktop";
      }
      this.mediaContainer.innerHTML = `<img src="${mediaSrc}" />`;
      document.getElementsByTagName("body")[0].appendChild(this.wrapper);
      document.getElementsByTagName("body")[0].appendChild(this.mediaContainer);
      this.showing = true;
    } else {
      this.close();
    }
  }

  close() {
    if (this.showing) {
      document.getElementsByTagName("body")[0].removeChild(this.wrapper);
      document.getElementsByTagName("body")[0].removeChild(this.mediaContainer);
      this.showing = false;
    }
  }
}
