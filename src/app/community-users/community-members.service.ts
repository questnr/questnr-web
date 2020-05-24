import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunityMembersService {
  baseUrl = environment.baseUrl;
  constructor(public http: HttpClient) { }
  getCommunityMembers(url, page) {
    return this.http.get(this.baseUrl + 'user/community/' + url + '/users', {params: {page}});
  }
}
