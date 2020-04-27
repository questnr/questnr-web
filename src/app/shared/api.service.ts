import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
  getJoinedCommunities() {
    return this.http.get(this.baseUrl + 'user/community/joined');
  }
  getSuggestedCommunities() {
    return this.http.get(this.baseUrl + 'community/suggested-community-list');
  }
  getTrendingCommunities() {
    return this.http.get(this.baseUrl + 'community/trending-community-list');
  }
}
