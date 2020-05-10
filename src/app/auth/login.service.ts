import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl;
  profileImg;

  constructor(private http: HttpClient, private router: Router) { }

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
    return this.http.get<any>(this.baseUrl + 'user/avatar');
  }
  getUserProfileImg() {
    this.getUser().subscribe(
      (res) => {
        this.profileImg = res?.avatarLink ? res.avatarLink : 'assets/default.jpg';
      }, err => {
        this.profileImg = 'assets/default.jpg';
      }
    );
  }

  getUserProfile() {
    const decodedData = jwtDecode(localStorage.getItem('token'));
    return decodedData;
  }

  logOut() {
    this.profileImg = null;
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
