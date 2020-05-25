import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PostActionForMedia } from 'models/post-action.model';
import { Observable } from 'rxjs';

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
  getPostMediaList(postId: number): Observable<PostActionForMedia> {
    return this.http.get<PostActionForMedia>(this.baseUrl + `user/posts/${postId}/media`);
  }
  getComments(postId, page) {
    return this.http.get(this.baseUrl + `user/posts/${postId}/comment`, { params: { page } });
  }
  postComment(postId, data) {
    return this.http.post(this.baseUrl + `user/posts/${postId}/comment`, data);
  }
  likePost(postId) {
    return this.http.post(this.baseUrl + `user/posts/${postId}/like`, {}, { observe: 'response' });
  }
  dislikePost(postId) {
    return this.http.delete(this.baseUrl + `user/posts/${postId}/like`, { observe: 'response' });
  }
  likeComment(commentId) {
    return this.http.post(this.baseUrl + `user/posts/comment/${commentId}/like`, {});
  }
  dislikeComment(commentId) {
    return this.http.delete(this.baseUrl + `user/posts/comment/${commentId}/like`);
  }
  getSharableLink(postId) {
    return this.http.post(this.baseUrl + `post/${postId}/link`, {});
  }
  removePost(postId) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete(this.baseUrl + '/user/posts/' + postId, httpOptions);
  }
}
