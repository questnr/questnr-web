import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { IFramelyData } from 'models/iframely.model';


@Injectable({
  providedIn: 'root'
})
export class IFramelyService {

  apiKey = 'b45f06cd090f9e75148e93';
  iframelyLink = 'https://iframe.ly/api/iframely';

  constructor(private http: HttpClient) { }


  async getIFramelyData(detectedLink: string): Promise<IFramelyData> {
    if (!detectedLink) return null;
    const iFramelyResp: any = await this.http.get(this.iframelyLink, { params: { url: detectedLink, api_key: this.apiKey } }).toPromise();
    let iFramelyData = new IFramelyData();
    if (!iFramelyResp || iFramelyResp.error) {
      iFramelyData.error = true;
    } else {
      iFramelyData.error = false;
      iFramelyData.url = iFramelyResp.url;
      iFramelyData.title = iFramelyResp.meta.title;
      iFramelyData.description = iFramelyResp.meta.description;
      iFramelyData.html = iFramelyResp.html;
      if (iFramelyResp?.links?.thumbnail?.length > 0) {
        iFramelyData.thumbnailLink = iFramelyResp.links.thumbnail[0].href;
      }
      if (iFramelyResp?.links?.icon?.length > 0) {
        iFramelyData.iconLink = iFramelyResp.links.icon[0].href;
      }
    }
    return iFramelyData;
  }
}
