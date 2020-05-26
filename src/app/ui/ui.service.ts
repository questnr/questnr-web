import { Injectable } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { MetaList } from 'models/common.model';
import { GlobalConstants } from 'shared/constants';
import { Title } from '@angular/platform-browser';

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
    console.log("metaList", metaList);
    for (let i = 0; i < metaList.length; i++) {
      this.metaService.setTag(
        metaList[i].metaInformation.type,
        metaList[i].metaInformation.content
      );
    }
  }
  resetTitle() {
    this.titleService.setTitle(GlobalConstants.siteTitle);
  }
}
