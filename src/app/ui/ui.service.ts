import { Injectable } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { MetaList } from 'models/common.model';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  constructor(private readonly metaService: MetaService) {
  }
  setMetaTagsAndTitle(title: string, metaList: MetaList[]) {
    this.metaService.setTitle(title + " | Questnr");
    for (let i = 0; i < metaList.length; i++) {
      this.metaService.setTag(
        metaList[i].metaInformation.type,
        metaList[i].metaInformation.content
      );
    }
  }
}