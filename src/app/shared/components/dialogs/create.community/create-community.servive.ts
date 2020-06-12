import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../../src/environments/environment';
import { Community } from 'models/community.model';

@Injectable({
  providedIn: 'root'
})

export class CommunityService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
  createCommunity(community) {
    return this.http.post<Community>(this.baseUrl + 'user/community', community);
  }
}
