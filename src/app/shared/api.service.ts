import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HashTag } from 'models/hashtag.model';
import { User } from 'models/user.model';
import { Community } from 'models/community.model';
import { Page } from 'models/page.model';

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
  getJoinedCommunities(userId: number) {
    return this.http.get(this.baseUrl + `user/${userId}/join/community`);
  }
  getSuggestedCommunities() {
    return this.http.get(this.baseUrl + 'community/suggested-community-list');
  }
  getTrendingCommunities() {
    return this.http.get(this.baseUrl + 'community/trending-community-list');
  }
  searchHashtags(userInput: string) {
    return this.http.get<HashTag[]>(this.baseUrl + `search/hash-tag`, { params: { hashTag: userInput } });
  }
  searchUsers(userInput: string) {
    return this.http.get<Page<User>>(this.baseUrl + `user/search/users`, { params: { userString: userInput } });
  }
  searchCommunities(userInput: string) {
    return this.http.get<Page<Community>>(this.baseUrl + `user/search/communities`, { params: { communityString: userInput } });
  }
  getNotifications(page: any = 0) {
    console.log(page);
    return this.http.get(this.baseUrl + 'user/notification', { params: { page } });
  }
  removeNotification(id) {
    return this.http.delete(this.baseUrl + 'user/notification/' + id, { observe: 'response' });
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
