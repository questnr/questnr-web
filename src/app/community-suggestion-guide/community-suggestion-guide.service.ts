import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { LoginResponse } from 'models/login.model';
import { Community } from 'models/community.model';
import { Page } from 'models/page.model';
import { UserInterest } from 'models/user.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunitySuggestionGuideService {
  baseUrl = environment.baseUrl;
  profileImg;

  constructor(private http: HttpClient, private router: Router) { }

  searchUserInterest(interestString: string) {
    return this.http.get<UserInterest[]>(this.baseUrl + 'user/search/interest', { params: { interestString: interestString } });
  }

  skipCommunitySuggestionGuide() {
    return this.http.delete(this.baseUrl + 'user/interest');
  }

  getCommunitySuggestionsForGuide(page, userInterests: string) {
    if (!userInterests) of();
    return this.http.post<Page<Community>>(this.baseUrl + 'user/community/suggestion/guide', { userInterests: userInterests });
  }
}
