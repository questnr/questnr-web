import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserProfileCardServiceComponent {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  followMe(id) {
    return this.http.post(this.baseUrl + 'user/follow/user/' + id , '')
  }
  unfollowMe(ownerId, userId) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}), body: { userId: ownerId}
    };
    return this.http.delete(this.baseUrl + 'user/follow/user/' + userId, httpOptions);
  }
}
