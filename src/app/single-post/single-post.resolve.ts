import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { SinglePost } from 'models/single-post.model';
import { map, catchError } from 'rxjs/operators';
import { UIService } from 'ui/ui.service';
import { SinglePostService } from './single-post.service';
import { ServerError } from 'models/common.model';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SinglePostResolve implements Resolve<Observable<SinglePost>> {

  constructor(private singlePostService: SinglePostService, private uiService: UIService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<SinglePost> {
    return this.singlePostService.getSinglePost(route.paramMap.get('postSlug')).pipe(map((singlePost: SinglePost) => {
      this.uiService.setMetaTagsAndTitle(singlePost.metaTagCard.title, singlePost.metaTagCard.metaList);
      return singlePost
    }), catchError((error: HttpErrorResponse, caught) => {
      if (error.status === 404 || error.status === 406) {
        return of({ error: error.error as ServerError } as SinglePost)
      }
    }));
  }
}