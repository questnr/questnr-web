import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserFollowersService {

  constructor(public http: HttpClient) { }
  baseUrl = environment.baseUrl;
  getUserFollowers(userId) {
    return this.http.get(this.baseUrl + 'user/follow/following/user/' + userId);
  }
  getFollowedBy(userId) {
    return this.http.get(this.baseUrl + 'user/follow/user/following/' + userId);
  }
}
