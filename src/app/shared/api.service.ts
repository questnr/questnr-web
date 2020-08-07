import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HashTag } from 'models/hashtag.model';
import { User } from 'models/user.model';
import { Community } from 'models/community.model';
import { Page } from 'models/page.model';
import { NotificationDTO } from 'models/notification.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.baseUrl;

  activeAuth = 'login';

  constructor(private http: HttpClient) { }

  getTopHashtags() {
    return this.http.get(this.baseUrl + 'hash-tag-with-highest-rank');
  }
  getTopUsers() {
    return this.http.get(this.baseUrl + 'users-with-highest-rank');
  }
  getJoinedCommunities(userId, page) {
    if (!userId) return of();
    return this.http.get(this.baseUrl + `user/${userId}/join/community`, { params: { page } });
  }
  getSuggestedCommunities() {
    return this.http.get(this.baseUrl + 'community/suggested-community-list');
  }
  getTrendingCommunities() {
    return this.http.get(this.baseUrl + 'community/trending-community-list');
  }
  getTrendingPostPollQuestion() {
    return this.http.get(this.baseUrl + 'user/explore/question');
  }
  searchHashtags(page, userInput: string) {
    return this.http.get<Page<HashTag>>(this.baseUrl + `search/hash-tag`, { params: { page: page, hashTag: userInput } });
  }
  searchUsers(page, userInput: string) {
    return this.http.get<Page<User>>(this.baseUrl + `user/search/users`, { params: { page: page, userString: userInput } });
  }
  searchCommunities(page, userInput: string) {
    return this.http.get<Page<Community>>(this.baseUrl + `user/search/communities`, { params: { page: page, communityString: userInput } });
  }
  getNotifications(page: any = 0) {
    return this.http.get<NotificationDTO[]>(this.baseUrl + 'user/notification', { params: { page } });
  }
  getNotificationAnswers(page: any = 0) {
    return this.http.get<NotificationDTO[]>(this.baseUrl + 'user/notification/answer', { params: { page } });
  }
  removeNotification(id) {
    if (!id) return of();
    return this.http.delete(this.baseUrl + 'user/notification/' + id, { observe: 'response' });
  }
  registerPushNotificationToken(token: string) {
    return this.http.post(this.baseUrl + 'user/push-notification/token', { token: token });
  }
  readNotification(notificationId) {
    return this.http.put(this.baseUrl + `user/notification/${notificationId}`, {});
  }
  getUnreadNotificationCount() {
    return this.http.get<number>(this.baseUrl + `user/unread-notification`);
  }
  getUnreadNotificationAnswerCount() {
    return this.http.get<number>(this.baseUrl + `user/unread-notification/answer`);
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
