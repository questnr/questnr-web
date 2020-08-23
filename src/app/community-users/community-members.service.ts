import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CommunityUsers, CommunityProfileMeta } from 'models/community.model';
import { Page } from 'models/page.model';

@Injectable({
  providedIn: 'root'
})
export class CommunityMembersService {
  baseUrl = environment.baseUrl;
  constructor(public http: HttpClient) { }
  getCommunityMembers(url: string, page, size = "4"): Observable<Page<CommunityUsers>> {
    if (!url) return of();
    return this.http.get<Page<CommunityUsers>>(this.baseUrl + 'user/community/' + url + '/users', { params: { page, size } });
  }

  getCommunityMetaInfoWithParams(communitySlug, params): Observable<CommunityProfileMeta> {
    if (!communitySlug) return of();
    return this.http.get<CommunityProfileMeta>(this.baseUrl + `/community/meta/${communitySlug}/info/params`, { params: { params } });
  }

  getCommunityMetaInfo(communitySlug): Observable<CommunityProfileMeta> {
    if (!communitySlug) return of();
    return this.http.get<CommunityProfileMeta>(this.baseUrl + `/community/meta/${communitySlug}/info`);
  }
}
