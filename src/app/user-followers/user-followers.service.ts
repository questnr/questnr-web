import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { LikeAction } from '../models/like-action.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class UserFollowersService {

  constructor(public http: HttpClient) { }
  baseUrl = environment.baseUrl;
  getUserFollowers(userId, page, size = "4") {
    if (!userId) return of();
    return this.http.get(this.baseUrl + 'user/follow/following/user/' + userId, { params: { page, size } });
  }
  getFollowedBy(userId, page, size = "4") {
    if (!userId) return of();
    return this.http.get(this.baseUrl + 'user/follow/user/following/' + userId, { params: { page, size } });
  }
  getUserLikedList(postId: number, page, size = "4"): Observable<Page<LikeAction>> {
    if (!postId) return of();
    return this.http.get<Page<LikeAction>>(this.baseUrl + `user/posts/${postId}/like`, { params: { page, size } });
  }
}
