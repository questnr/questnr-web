import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as jwtDecode from 'jwt-decode';

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

  loginWithGoogle(data) {
    return this.http.get(this.baseUrl + 'oauth2/google/login/token', { params: data });
  }

  signUp(user) {
    return this.http.post<any>(this.baseUrl + 'sign-up', user);
  }

  getUser() {
    return this.http.get<any>(this.baseUrl + 'user/avatar', { observe: 'response' });
  }

  getUserProfile() {
    const decodedData = jwtDecode(localStorage.getItem('token'));
    return decodedData;
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
