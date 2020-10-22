import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Community } from '../models/community.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class UsercommunityService {
  baseUrl = environment.baseUrl;

  constructor(public http: HttpClient) { }

  getUserOwnedCommunity(userId, page): Observable<Page<Community>> {
    if (!userId) return of();
    return this.http.get<Page<Community>>(this.baseUrl + 'user/' + userId + '/community', { params: { page } });
  }
}
