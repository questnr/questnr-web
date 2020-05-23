import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Community } from 'models/community.model';
import { CommunityService } from './community.service';

@Injectable()
export class CommunityResolve implements Resolve<Promise<Community>> {

  constructor(private communityService: CommunityService) {}

  resolve(route: ActivatedRouteSnapshot):  Promise<Community> {
    return this.communityService.getCommunityDetails(route.paramMap.get('communitySlug')).toPromise();
  }
}