import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  postFeed(data) {
    return this.http.post(this.baseUrl + 'user/posts', data);
  }
  getFeeds() {
    return this.http.get(this.baseUrl + 'user/feed');
  }
}
