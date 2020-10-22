import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Page } from '../models/page.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CommunityMembersService {
  baseUrl = environment.baseUrl;
  constructor(public http: HttpClient) { }
  getCommunityMembers(url: string, page, size = "4"): Observable<Page<User>> {
    if (!url) return of();
    return this.http.get<Page<User>>(this.baseUrl + `user/community/${url}/users`, { params: { page, size } });
  }

  removeUserFromCommunity(communityId, userId) {
    if (!communityId || !userId) return of();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: { userId: userId }
    };
    return this.http.delete(this.baseUrl + `/user/join/community/${communityId}`, httpOptions);
  }
}
