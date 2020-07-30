import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { MetaService } from '@ngx-meta/core';
import { MetaList } from 'models/common.model';
import { GlobalConstants } from 'shared/constants';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  constructor(private readonly metaService: MetaService, private titleService: Title, private meta: Meta) {
  }
  setMetaTagsAndTitle(title: string, metaList: MetaList[]) {
    if (title) {
      this.metaService.setTitle(title);
    }
    for (let i = 0; i < metaList.length; i++) {
      this.metaService.setTag(
        metaList[i].metaInformation.type,
        metaList[i].metaInformation.content
      );
    }
    this.meta.addTag({ name: 'fb:app_id', content: GlobalConstants.fbAppId });
  }
  setDetault() {
    this.resetTitle();
    this.metaService.setTag("description", GlobalConstants.description);
    this.metaService.setTag("author", GlobalConstants.siteTitle);
    this.metaService.setTag("robots", "index, follow, max-image-preview:standard");
    this.metaService.setTag("googlebot", "index, follow, max-image-preview:standard");
    this.metaService.setTag("og:url", GlobalConstants.siteLink);
    this.metaService.setTag("og:title", GlobalConstants.siteTitle);
    this.metaService.setTag("og:image", GlobalConstants.siteLogoExternalLink);
    this.metaService.setTag("og:type", "website");
    this.metaService.setTag("og:locale", "en_US");
    this.metaService.setTag("og:site_name", GlobalConstants.siteTitle);
    this.metaService.setTag("twitter:title", GlobalConstants.siteTitle);
    this.metaService.setTag("twitter:description", GlobalConstants.description);
    this.metaService.setTag("twitter:url", GlobalConstants.siteLink);
    this.metaService.setTag("twitter:image", GlobalConstants.siteLogoExternalLink);
    this.metaService.setTag("twitter:image:src", GlobalConstants.siteLogoExternalLink);
    this.metaService.setTag("twitter:card", "summary_large_image");
    this.meta.addTag({ name: 'fb:app_id', content: GlobalConstants.fbAppId });
  }
  setTitle(title) {
    this.titleService.setTitle(title);
  }
  resetTitle() {
    this.titleService.setTitle(GlobalConstants.siteTitle);
  }
}
