import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Page } from '../models/page.model';
import { Post } from '../models/post-action.model';

@Injectable({
  providedIn: 'root'
})
export class UserQuestionService {
  baseUrl = environment.baseUrl;

  constructor(public http: HttpClient) { }

  getUserQuestions(userId, page = "0"): Observable<Page<Post>> {
    return this.http.get<Page<Post>>(this.baseUrl + `user/${userId}/posts/poll/question`, { params: { page: page } });
  }

  getCommunityQuestions(communityId, page = "0"): Observable<Page<Post>> {
    return this.http.get<Page<Post>>(this.baseUrl + `user/community/${communityId}/posts/poll/question`, { params: { page: page } });
  }
}
