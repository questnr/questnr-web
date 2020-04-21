import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  checkUsername(val: string) {
    return this.http.post(this.baseUrl + 'check-username', val);
  }

  login(user) {
    return this.http.post<any>(this.baseUrl + 'login', user);
  }

  signUp(user) {
    return this.http.post<any>(this.baseUrl + 'sign-up', user);
  }

  loggedIn() {
    return !!localStorage.getItem('access_token');
  }
}
