import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AskQuestionService {
  baseUrl = environment.baseUrl;

  constructor(public  http: HttpClient) { }

  postQuestion(questionObject) {
    return this.http.post(this.baseUrl + 'user/posts/poll/question', questionObject );
  }
  respondToQuestion(postId, response) {
    return this.http.post(this.baseUrl + `user/posts/${postId}/poll/answer`, {pollAnswer: response});
  }
  postQuestionInCommunity(communityId, response) {
    return this.http.post(this.baseUrl + `user/community/${communityId}/posts/poll/question` , response);
  }
}
