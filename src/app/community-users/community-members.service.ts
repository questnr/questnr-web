import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CommunityUsers, CommunityProfileMeta } from 'models/community.model';

@Injectable({
  providedIn: 'root'
})
export class CommunityMembersService {
  baseUrl = environment.baseUrl;
  constructor(public http: HttpClient) { }
  getCommunityMembers(url: string, page, size = "4"): Observable<CommunityUsers> {
    if (!url) return of();
    return this.http.get<CommunityUsers>(this.baseUrl + 'user/community/' + url + '/users', { params: { page, size } });
  }

  getCommunityMetaInfo(url): Observable<CommunityProfileMeta> {
    if (!url) return of();
    return this.http.get<CommunityProfileMeta>(this.baseUrl + `/community/meta/${url}/info`);
  }
}
