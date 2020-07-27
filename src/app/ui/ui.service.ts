import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MetaService } from '@ngx-meta/core';
import { MetaList } from 'models/common.model';
import { GlobalConstants } from 'shared/constants';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  constructor(private readonly metaService: MetaService, private titleService: Title) {
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
  }
  setTitle(title) {
    this.titleService.setTitle(title);
  }
  resetTitle() {
    this.titleService.setTitle(GlobalConstants.siteTitle);
  }
}
