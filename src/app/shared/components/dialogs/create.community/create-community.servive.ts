import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CommunityService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
  createCommunity(community) {
    const headers =  new HttpHeaders({
      'content-type': 'multipart/form-data; boundary=$&#*',
      'content-length': '10000000000000'
    });
    return this.http.post<any>(this.baseUrl + 'user/community', community);
  }
}
