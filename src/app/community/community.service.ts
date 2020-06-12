import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Community } from '../models/community.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommunityService {

  baseUrl = environment.baseUrl;


  constructor(private http: HttpClient) { }
  getCommunityDetails(slug): Observable<Community> {
    if (!slug) return of();
    return this.http.get<Community>(this.baseUrl + 'community/' + slug);
  }

  getCommunityUserList(slug) {
    if (!slug) return of();
    return this.http.get(this.baseUrl + 'user/community/' + slug + '/users');
  }
  getCommunityFeeds(id, page) {
    if (!id) return of();
    return this.http.get(this.baseUrl + 'user/community/' + id + '/posts', { params: { page } });
  }
  updateCommunityAvatar(formData, comId) {
    if (!comId) return of();
    return this.http.post(this.baseUrl + 'user/community/' + comId + '/avatar', formData);
  }
  followCommunity(id) {
    if (!id) return of();
    return this.http.post(this.baseUrl + 'user/join/community/' + id, '');
  }
  unfollowCommunityService(communityId, userId) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: { userId }
    };
    if (!communityId) return of();
    return this.http.delete(this.baseUrl + 'user/join/community/' + communityId, httpOptions);
  }

  getSharableLink(communityId) {
    if (!communityId) return of();
    return this.http.get(this.baseUrl + `user/community/${communityId}/link`, {});
  }
}
