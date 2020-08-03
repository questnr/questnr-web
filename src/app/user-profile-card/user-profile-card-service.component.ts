import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GlobalConstants } from 'shared/constants';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserProfileCardServiceComponent {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {

  }

  followMe(id) {
    if (!id) return of();
    return this.http.post(this.baseUrl + 'user/follow/user/' + id, '');
  }
  unfollowMe(ownerId, userId) {
    if (!ownerId || !ownerId) of();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: { userId: ownerId }
    };
    return this.http.delete(this.baseUrl + 'user/follow/user/' + userId, httpOptions);
  }
  fetchUserFollowing(slug: string) {
    if (!slug) return of();
    return this.http.get(this.baseUrl + 'community/meta/' + slug + '/info');
  }
}
