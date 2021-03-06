import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SimplifiedPostType, SinglePost } from 'models/single-post.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SinglePostService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSinglePost(slug: string, slugType: SimplifiedPostType = SimplifiedPostType.post) {
    return this.http.get<SinglePost>(this.baseUrl + `${slugType}/` + slug);
  }
  getPublicComments(postSlug: string) {
    if (!postSlug) return of();
    return this.http.get(this.baseUrl + `post/${postSlug}/comment`);
  }
  getPublicLikes(postSlug: string) {
    if (!postSlug) return of();
    return this.http.get(this.baseUrl + `post/${postSlug}/like`);
  }
}
