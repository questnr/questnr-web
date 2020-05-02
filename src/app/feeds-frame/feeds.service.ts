import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  postFeed(data, apiUrl) {
    const req = new HttpRequest('POST', this.baseUrl + apiUrl, data, { reportProgress: true });
    return this.http.request(req);
  }
  getFeeds(page) {
    return this.http.get(this.baseUrl + 'user/feed', { params: { page } });
  }
  getComments(postId) {
    return this.http.get(this.baseUrl + `user/posts/${postId}/comment`);
  }
  postComment(postId, data) {
    return this.http.post(this.baseUrl + `user/posts/${postId}/comment`, data);
  }
  likePost(postId) {
    return this.http.post(this.baseUrl + `user/posts/${postId}/like`, {});
  }
  dislikePost(postId) {
    return this.http.delete(this.baseUrl + `user/posts/${postId}/like`);
  }
  likeComment(commentId) {
    return this.http.post(this.baseUrl + `user/posts/comment/${commentId}/like`, {});
  }
  dislikeComment(commentId) {
    return this.http.delete(this.baseUrl + `user/posts/comment/${commentId}/like`);
  }
}
