import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

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
  getUserInfo(slug) {
    if (!slug) return of();
    return this.http.get(this.baseUrl + 'user/profile/meta/' + slug + '/info');
  }
  updateProfilePicture(file) {
    return this.http.post(this.baseUrl + 'user/avatar', file);
  }
  updateUser(formData) {
    return this.http.put(this.baseUrl + 'user', formData);
  }
}
