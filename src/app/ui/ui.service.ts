import { Injectable } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { MetaList } from 'models/common.model';
import { GlobalConstants } from 'shared/constants';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  constructor(private readonly metaService: MetaService) {
  }
  setMetaTagsAndTitle(title: string, metaList: MetaList[]) {
    console.log("title", title);
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
  resetTitle() {
    this.metaService.setTitle(GlobalConstants.siteTitle);
  }
}
