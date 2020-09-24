import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Page } from 'models/page.model';
import { Community } from 'models/community.model';

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
