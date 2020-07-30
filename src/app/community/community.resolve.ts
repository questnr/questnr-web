import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Community, CommunityPublic } from 'models/community.model';
import { CommunityService } from './community.service';
import { map } from 'rxjs/operators';
import { UIService } from 'ui/ui.service';

@Injectable()
export class CommunityResolve implements Resolve<Promise<Community>> {

  constructor(private communityService: CommunityService, private uiService: UIService) { }

  resolve(route: ActivatedRouteSnapshot): Promise<Community> {
    return this.communityService.getCommunityDetails(route.paramMap.get('communitySlug')).pipe(map((communityDTO: CommunityPublic) => {
      this.uiService.setMetaTagsAndTitle(communityDTO.metaTagCard.title, communityDTO.metaTagCard.metaList);
      return communityDTO;
    })).toPromise();
  }
}