import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {
  baseUrl = environment.baseUrl;
  constructor(public http: HttpClient) { }

  getUserInfo(slug) {
    return this.http.get(this.baseUrl + 'user/profile/meta/' + slug + '/info');
  }
}
