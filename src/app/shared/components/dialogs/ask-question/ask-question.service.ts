import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PollQuestionMeta } from '../../../../models/post-action.model';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AskQuestionService {
  baseUrl = environment.baseUrl;

  constructor(public http: HttpClient) { }

  postQuestion(questionObj) {
    return this.http.post(this.baseUrl + 'user/posts/poll/question', questionObj);
  }
  respondToQuestion(postId, response): Observable<PollQuestionMeta> {
    if (!postId || !response) of();
    return this.http.post<PollQuestionMeta>(this.baseUrl + `user/posts/${postId}/poll/answer`, { pollAnswer: response });
  }
  postQuestionInCommunity(communityId, questionObj) {
    if (!communityId || !questionObj) of();
    return this.http.post(this.baseUrl + `user/community/${communityId}/posts/poll/question`, questionObj);
  }
}
