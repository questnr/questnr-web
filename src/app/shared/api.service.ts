import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getTopHashtags() {
    return this.http.get(this.baseUrl + 'hash-tag-with-highest-rank');
  }
  getTopUsers() {
    return this.http.get(this.baseUrl + 'users-with-highest-rank');
  }
  getJoinedCommunities() {
    return this.http.get(this.baseUrl + 'user/community/joined');
  }
  getSuggestedCommunities() {
    return this.http.get(this.baseUrl + 'community/suggested-community-list');
  }
  getTrendingCommunities() {
    return this.http.get(this.baseUrl + 'community/trending-community-list');
  }
  searchHashtag(hashTag) {
    return this.http.get(this.baseUrl + `search/hash-tag`, { params: { hashTag } });
  }
  getNotifications() {
    return this.http.get(this.baseUrl + 'user/notification');
  }
  getSharableLink(postId) {
    return this.http.get(this.baseUrl + `post/${postId}/link`);
  }
  registerPushNotificationToken(token: string) {
    return this.http.post(this.baseUrl + 'user/push-notification/token', { token: token });
  }
  // deletePushNotificationToken(token: string) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: { token: token }
  //   };
  //   return this.http.delete(this.baseUrl + 'push-notification/token', httpOptions);
  // }
  refreshPushNotificationToken(currentToken: string, refreshedToken: string) {
    return this.http.post(this.baseUrl + 'user/push-notification/refresh-token',
      { expiredToken: currentToken, token: refreshedToken }
    );
  }
}
