import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CommunityService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
  createCommunity(community) {
    return this.http.post<any>(this.baseUrl + 'community', community);
  }
}
