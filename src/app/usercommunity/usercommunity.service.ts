import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsercommunityService {
  baseUrl = environment.baseUrl;

  constructor(public http: HttpClient) { }

  getUserOwnedCommunity(userId, page) {
    if (!userId) return of();
    return this.http.get(this.baseUrl + 'user/' + userId + '/community', { params: { page } });
  }
}
