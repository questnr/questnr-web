import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of, Observable } from 'rxjs';
import { UserInfo } from 'models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {
  baseUrl = environment.baseUrl;
  constructor(public http: HttpClient) { }

  getUserInfo(slug: string): Observable<UserInfo> {
    if (!slug) return of();
    return this.http.get<UserInfo>(this.baseUrl + 'user/profile/meta/' + slug + '/info');
  }
}
