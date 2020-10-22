import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import { AvatarDTO } from '../models/common.model';
import { LoginResponse } from '../models/login.model';
import { LocalUser, User } from '../models/user.model';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StaticMediaSrc } from '../shared/constants/static-media-src';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: User;
  avatar: AvatarDTO;
  public userSubject: Subject<User> = new Subject();
  public avatarSubject: Subject<AvatarDTO> = new Subject();
  private baseUrl = environment.baseUrl;
  profileImg: string;

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

  getUserAvatar(): Observable<AvatarDTO> {
    return this.http.get<AvatarDTO>(this.baseUrl + 'user/avatar');
  }

  getUserDetails(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'user/' + id);
  }

  getLoggedInUserDetails(): Observable<User | void> {
    return this.getUserDetails(this.getLocalUserProfile().id).pipe(map((user: User) => {
      if (this.getLocalUserProfile().id == user.userId) {
        this.user = user;
        this.avatar = this.user.avatarDTO;
        this.profileImg = this.avatar?.avatarLink ? this.avatar.avatarLink : StaticMediaSrc.userFile;
        this.avatarSubject.next(this.user.avatarDTO);
        this.userSubject.next(user);
        return user;
      } else {
        this.logOut();
        return of(null);
      }
    }), catchError((error: HttpErrorResponse) => {
      this.logOut();
      return of(null);
    }));
  }

  getUser(): Promise<User> {
    return new Promise((resolve) => {
      if (typeof this.user != 'undefined' && this.user) {
        return resolve(this.user);
      } else {
        let getUserSubscriber = this.userSubject.subscribe((user: User) => {
          getUserSubscriber.unsubscribe();
          resolve(user);
        });
      }
    });
  }

  getUserProfileImg() {
    this.getUserAvatar().subscribe(
      (avatar: AvatarDTO) => {
        this.avatar = avatar;
        this.profileImg = avatar?.avatarLink ? avatar.avatarLink : StaticMediaSrc.userFile;
      }, err => {
        this.profileImg = StaticMediaSrc.userFile;
      }
    );
  }

  getLocalUserProfile(): LocalUser {
    const decodedData = jwtDecode(localStorage.getItem('token'));
    var current_time = Date.now() / 1000;
    if (decodedData.exp < current_time) {
      this.logOut();
    }
    // console.log("decodedData", decodedData);
    return decodedData;
  }

  logOut() {
    this.profileImg = null;
    this.user = null;
    this.userSubject.next(null);
    this.avatarSubject.next(null);
    localStorage.clear();
    this.router.navigate(['/']);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getUserId(): number {
    if (this.user?.userId) {
      return this.user.userId;
    }
    try {
      const user = this.getLocalUserProfile();
      return user.id;
    } catch (e) {
      this.logOut();
    }
  }

  getUserSlug(): string {
    if (this.user?.slug) {
      return this.user.slug;
    }
    try {
      const user = this.getLocalUserProfile();
      return user.slug;
    } catch (e) {
      this.logOut();
    }
  }

  isThisLoggedInUser(userId: number): boolean {
    if (this.user?.userId) {
      return this.user.userId === userId;
    }
    try {
      return this.getLocalUserProfile().id === userId;
    } catch (e) {
      return false;
    }
  }
}
