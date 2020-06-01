import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {
  baseUrl = environment.baseUrl;
  constructor(public http: HttpClient) { }

  getUserInfo(slug: string) {
    if (!slug) return of();
    return this.http.get(this.baseUrl + 'user/profile/meta/' + slug + '/info');
  }
}
