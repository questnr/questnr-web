import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfilePageService {

  constructor(public http: HttpClient) { }
  baseUrl = environment.baseUrl;
  getUserFeeds(userId, page) {
    return this.http.get(this.baseUrl + 'user/' + userId + '/posts', {params: { page } } );
  }
  getUserProfile(slug) {
    return this.http.get(this.baseUrl + 'user/profile/' + slug );
  }
  getUserInfo(slug) {
    return this.http.get(this.baseUrl + 'user/profile/meta/' + slug + '/info');
  }
  updateProfilePicture(file) {
    return this.http.post(this.baseUrl + 'user/avatar', file);
  }
}
