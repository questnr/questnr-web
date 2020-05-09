import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SinglePost } from 'models/signle-post.model';

@Injectable({
  providedIn: 'root'
})
export class SinglePostService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSinglePost(slug: string) {
    return this.http.get<SinglePost>(this.baseUrl + 'post/' + slug);
  }
  getPublicComments(postSlug: string) {
    return this.http.get(this.baseUrl + `post/${postSlug}/comment`);
  }
  getPublicLikes(postSlug: string) {
    return this.http.get(this.baseUrl + `post/${postSlug}/like`);
  }
}
