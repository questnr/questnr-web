import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Community } from '../../../../models/community.model';

@Injectable({
  providedIn: 'root'
})

export class CreateCommunityService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
  createCommunity(community) {
    return this.http.post<Community>(this.baseUrl + 'user/community', community);
  }
}
