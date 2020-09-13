import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Community } from 'models/community.model';
import { Page } from 'models/page.model';
import { UserInterest } from 'models/user.model';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommunitySuggestionGuideService {
  baseUrl = environment.baseUrl;
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
