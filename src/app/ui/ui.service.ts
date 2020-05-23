import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { MetaList } from 'models/common.model';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  constructor(private titleService: Title, private meta: Meta) {
  }
  setMetaTagsAndTitle(title: string, metaList: MetaList[]) {
    this.titleService.setTitle(title + " | Questnr");
    for (let i = 0; i < metaList.length; i++) {
      console.log(metaList[i].metaInformation.attributeType);
      setTimeout(() => {
        this.meta.updateTag({
          [metaList[i].metaInformation.attributeType]: metaList[i].metaInformation.type,
          content: metaList[i].metaInformation.content
        });
      }, 0);
    }
  }
}
