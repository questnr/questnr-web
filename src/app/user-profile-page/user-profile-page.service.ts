import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Page } from '../models/page.model';
import { Post } from '../models/post-action.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfilePageService {

  constructor(public http: HttpClient) { }
  baseUrl = environment.baseUrl;
  getUserFeeds(userId, page) {
    if (!userId) return of();
    return this.http.get(this.baseUrl + 'user/' + userId + '/posts', { params: { page } });
  }
  getUserProfile(slug) {
    if (!slug) return of();
    return this.http.get(this.baseUrl + 'user/profile/' + slug);
  }
  updateProfilePicture(file) {
    return this.http.post(this.baseUrl + 'user/avatar', file);
  }
  updateUser(formData) {
    return this.http.put(this.baseUrl + 'user', formData);
  }
  updateUserBanner(formData) {
    return this.http.post(this.baseUrl + 'user/banner', formData);
  }
  getUserQuestions(userId): Observable<Page<Post>> {
    return this.http.get<Page<Post>>(this.baseUrl + `user/${userId}/posts/poll/question`);
  }
}
