import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getTopHashtags() {
    return this.http.get(this.baseUrl + 'hash-tag-with-highest-rank');
  }
  getTopUsers() {
    return this.http.get(this.baseUrl + 'users-with-highest-rank');
  }
  registerPushNotificationToken(token: string){
    return this.http.post(this.baseUrl + 'push-notification/token', token);
  }
}
