import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { MetaInformation, MetaList } from 'models/common.model';
import { GlobalConstants } from 'shared/constants';
import { UIService } from 'ui/ui.service';

@Injectable()
export class LandingPageResolve implements Resolve<Promise<string>> {

    constructor(private uiService: UIService) { }

    resolve(route: ActivatedRouteSnapshot): Promise<string> {
        return new Promise((resolve) => {
            // let metaList: MetaList[] = [];

            // let metaInfo2: MetaInformation = new MetaInformation();
            // metaInfo2.attributeType = "name";
            // metaInfo2.type = "description";
            // metaInfo2.content = GlobalConstants.description;
            // metaList.push(new MetaList(metaInfo2));

            // let metaInfo3: MetaInformation = new MetaInformation();
            // metaInfo3.attributeType = "name";
            // metaInfo3.type = "author";
            // metaInfo3.content = GlobalConstants.siteTitle;
            // metaList.push(new MetaList(metaInfo3));

            // let metaInfo4: MetaInformation = new MetaInformation();
            // metaInfo4.attributeType = "name";
            // metaInfo4.type = "robots";
            // metaInfo4.content = "index, follow, max-image-preview:standard";
            // metaList.push(new MetaList(metaInfo4));

            // let metaInfo5: MetaInformation = new MetaInformation();
            // metaInfo5.attributeType = "name";
            // metaInfo5.type = "googlebot";
            // metaInfo5.content = "index, follow, max-image-preview:standard";
            // metaList.push(new MetaList(metaInfo5));

            // let metaInfo6: MetaInformation = new MetaInformation();
            // metaInfo6.attributeType = "property";
            // metaInfo6.type = "og:url";
            // metaInfo6.content = GlobalConstants.siteLink;
            // metaList.push(new MetaList(metaInfo6));

            // let metaInfo7: MetaInformation = new MetaInformation();
            // metaInfo7.attributeType = "property";
            // metaInfo7.type = "og:title";
            // metaInfo7.content = GlobalConstants.siteTitle;
            // metaList.push(new MetaList(metaInfo7));

            // let metaInfo8: MetaInformation = new MetaInformation();
            // metaInfo8.attributeType = "property";
            // metaInfo8.type = "og:image";
            // metaInfo8.content = GlobalConstants.siteLogoExternalLink;
            // metaList.push(new MetaList(metaInfo8));

            // let metaInfo9: MetaInformation = new MetaInformation();
            // metaInfo8.attributeType = "property";
            // metaInfo9.type = "og:type";
            // metaInfo9.content = "website";
            // metaList.push(new MetaList(metaInfo9));

            // let metaInfo10: MetaInformation = new MetaInformation();
            // metaInfo10.attributeType = "property";
            // metaInfo10.type = "fb:app_id";
            // metaInfo10.content = GlobalConstants.fbAppId;
            // metaList.push(new MetaList(metaInfo10));

            // let metaInfo11: MetaInformation = new MetaInformation();
            // metaInfo11.attributeType = "property";
            // metaInfo11.type = "twitter:url";
            // metaInfo11.content = GlobalConstants.siteLink;
            // metaList.push(new MetaList(metaInfo11));

            // let metaInfo12: MetaInformation = new MetaInformation();
            // metaInfo12.attributeType = "property";
            // metaInfo12.type = "twitter:title";
            // metaInfo12.content = GlobalConstants.siteTitle;
            // metaList.push(new MetaList(metaInfo12));

            // let metaInfo13: MetaInformation = new MetaInformation();
            // metaInfo13.attributeType = "property";
            // metaInfo13.type = "twitter:image";
            // metaInfo13.content = GlobalConstants.siteLogoExternalLink;
            // metaList.push(new MetaList(metaInfo13));

            // let metaInfo14: MetaInformation = new MetaInformation();
            // metaInfo14.attributeType = "property";
            // metaInfo14.type = "twitter:type";
            // metaInfo14.content = "website";
            // metaList.push(new MetaList(metaInfo14));

            this.uiService.setDetault();
            resolve(GlobalConstants.siteTitle);
        })
    }
}