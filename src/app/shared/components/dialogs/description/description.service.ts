import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DescriptionService {
  baseUrl = environment.baseUrl;
  constructor(public http: HttpClient) { }

  updateDescription(desc: string, communityId: number) {
    if (!communityId) return of();
    return this.http.put(this.baseUrl + `/user/community/${communityId}`, { description: desc });
  }
}
