import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { IFramelyData } from 'models/iframely.model';


@Injectable({
  providedIn: 'root'
})
export class IFramelyService {

  apiKey: string = "b45f06cd090f9e75148e93";
  iframelyLink: string = "https://iframe.ly/api/iframely";

  constructor(private http: HttpClient) { }


  iFramelyData: IFramelyData = new IFramelyData();

  async getIFramelyData(detectedLink: string): Promise<IFramelyData> {
    let iFramelyResp: any = await this.http.get(this.iframelyLink, { params: { url: detectedLink, api_key: this.apiKey } }).toPromise();
    if (!iFramelyResp || iFramelyResp.error) {
      this.iFramelyData.error = true;
    }
    else {
      this.iFramelyData.error = false;
      this.iFramelyData.url = iFramelyResp.url;
      this.iFramelyData.title = iFramelyResp.meta.title;
      this.iFramelyData.description = iFramelyResp.meta.description;
      if (iFramelyResp?.links?.thumbnail?.length > 0) {
        this.iFramelyData.thumbnailLink = iFramelyResp.links.thumbnail[0].href;
      }
      if (iFramelyResp?.links?.icon?.length > 0) {
        this.iFramelyData.iconLink = iFramelyResp.links.icon[0].href;
      }
    }
    return this.iFramelyData;
  }
}
