import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Community } from '../models/community.model';

@Injectable({
  providedIn: 'root'
})

export class CommunityService {

  baseUrl = environment.baseUrl;


  constructor(private http: HttpClient) { }
  getCommunityDetails(slug) {
    return this.http.get<Community>(this.baseUrl + 'community/' + slug);
  }

  getCommunityUserList(slug) {
    return this.http.get(this.baseUrl + 'user/community/' + slug + '/users');
  }
  getCommunityFeeds(id) {
    return this.http.get(this.baseUrl + 'user/community/' + id + '/posts');
  }
  updateCommunityAvatar(formdData, comId) {
    return this.http.post(this.baseUrl + 'user/community/' + comId + '/avatar', formdData);
  }
  followCommunity(id) {
    return this.http.post(this.baseUrl + 'user/join/community/' + id, '');
  }
  unfollowCommunity(id) {
    return this.http.delete(this.baseUrl + 'user/join/community/' + id);
  }
}
