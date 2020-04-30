import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Community} from './community.model';

@Injectable({
  providedIn: 'root'
})

export class CommunityService {

  baseUrl = environment.baseUrl;


  constructor(private http: HttpClient) { }
  getCommunityDetails(slug) {
    return this.http.get<Community>(this.baseUrl + 'community/' + slug);
  }

  getCommunityUserList(slug) {
    return this.http.get(this.baseUrl + 'user/community/' + slug + '/users' );
  }
  getCommunityFeeds(id) {
    return this.http.get(this.baseUrl + 'user/community/' + id + '/posts');
  }
}
