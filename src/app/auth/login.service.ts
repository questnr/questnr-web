import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { LoginResponse } from 'models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl;
  profileImg;

  constructor(private http: HttpClient, private router: Router) { }

  checkUsernameExists(val: string) {
    return this.http.post(this.baseUrl + 'check-username', { username: val });
  }

  checkEmailExists(val: string) {
    return this.http.post(this.baseUrl + 'check-email', { email: val });
  }

  login(user) {
    return this.http.post<LoginResponse>(this.baseUrl + 'login', user);
  }

  loginWithGoogle(data) {
    return this.http.get(this.baseUrl + 'oauth2/google/login/token', { params: data });
  }

  loginWithFacebook(data) {
    return this.http.get(this.baseUrl + 'oauth2/facebook/login/token', { params: data });
  }

  signUp(user) {
    return this.http.post<LoginResponse>(this.baseUrl + 'sign-up', user);
  }

  getUser() {
    return this.http.get<any>(this.baseUrl + 'user/avatar');
  }
  getUserDetails(id) {
    return this.http.get(this.baseUrl + 'user/' + id);
  }
  getUserProfileImg() {
    this.getUser().subscribe(
      (res) => {
        this.profileImg = res?.avatarLink ? res.avatarLink : StaticMediaSrc.userFile;
      }, err => {
        this.profileImg = StaticMediaSrc.userFile;
      }
    );
  }

  getUserProfile() {
    const decodedData = jwtDecode(localStorage.getItem('token'));
    var current_time = Date.now() / 1000;
    if (decodedData.exp < current_time) {
      this.logOut();
    }
    return decodedData;
  }

  logOut() {
    this.profileImg = null;
    localStorage.clear();
    this.router.navigate(['/']);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  getUserId() {
    try {
      const user = this.getUserProfile();
      return user.id;
    } catch (e) {
      return -99;
    }
  }
}
