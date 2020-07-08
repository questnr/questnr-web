import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';

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
}
