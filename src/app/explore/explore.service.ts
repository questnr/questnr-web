import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExploreService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  explore(page) {
    return this.http.get(this.baseUrl + '/user/explore', { params: { page } });
  }

  getHashtagPost(hashtag, page) {
    if (!hashtag) return of();
    return this.http.get(this.baseUrl + '/user/hash-tag/' + hashtag + '/posts', { params: { page } });
  }

}
