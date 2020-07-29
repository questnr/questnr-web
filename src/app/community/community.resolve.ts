import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Community } from 'models/community.model';
import { CommunityService } from './community.service';
import { map } from 'rxjs/operators';
import { UIService } from 'ui/ui.service';

@Injectable()
export class CommunityResolve implements Resolve<Promise<Community>> {

  constructor(private communityService: CommunityService, private uiService: UIService) { }

  resolve(route: ActivatedRouteSnapshot): Promise<Community> {
    return this.communityService.getCommunityDetails(route.paramMap.get('communitySlug')).pipe(map((communityDTO: Community) => {
      this.uiService.setMetaTagsAndTitle(communityDTO.communityName, communityDTO.metaList);
      console.log("sending community");
      return communityDTO;
    })).toPromise();
  }
}