import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Page } from 'models/page.model';
import { User } from 'models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserFollowersService {

  constructor(public http: HttpClient) { }
  baseUrl = environment.baseUrl;
  getUserFollowers(userId, page) {
    return this.http.get(this.baseUrl + 'user/follow/following/user/' + userId, { params: { page } });
  }
  getFollowedBy(userId, page) {
    return this.http.get(this.baseUrl + 'user/follow/user/following/' + userId, { params: { page } });
  }
  getUserLikedList(postId: number, page) {
    return this.http.get(this.baseUrl + `user/posts/${postId}/like`, { params: { page } });
  }
}
