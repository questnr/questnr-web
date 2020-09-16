import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { SinglePost } from 'models/single-post.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from 'ui/ui.service';
import { SinglePostService } from './single-post.service';

@Injectable()
export class SinglePostResolve implements Resolve<Observable<SinglePost>> {

  constructor(private singlePostService: SinglePostService, private uiService: UIService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<SinglePost> {
    return this.singlePostService.getSinglePost(route.paramMap.get('postSlug')).pipe(map((singlePost: SinglePost) => {
      if (!singlePost.hasError) {
        this.uiService.setMetaTagsAndTitle(singlePost.metaTagCard.title, singlePost.metaTagCard.metaList);
      } else {
        this.uiService.setDetault("Post | Questnr");
      }
      return singlePost;
    }));
  }
}