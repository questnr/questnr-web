import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { CustomError } from 'models/common.model';
import { SimplifiedPostType, SinglePost } from 'models/single-post.model';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalConstants } from 'shared/constants';
import { UIService } from 'ui/ui.service';
import { SinglePostService } from './single-post.service';

@Injectable()
export class SinglePostResolve implements Resolve<Observable<SinglePost>> {

  constructor(
    private router: Router,
    private singlePostService: SinglePostService,
    private uiService: UIService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<SinglePost> {
    let path = route.url[0].path as SimplifiedPostType;
    if (!path) {
      this.redirectToErrorPage();
      return of();
    }
    return this.singlePostService.getSinglePost(route.paramMap.get('postSlug'), path).pipe(map((singlePost: SinglePost) => {
      if (!singlePost.hasError) {
        this.uiService.setMetaTagsAndTitle(singlePost.metaTagCard.title, singlePost.metaTagCard.metaList);
      } else {
        if (path === SimplifiedPostType.post)
          this.uiService.setDetault(GlobalConstants.postTitle);
        else if (path === SimplifiedPostType.blog)
          this.uiService.setDetault(GlobalConstants.postBlogTitle);
        else if (path === SimplifiedPostType.question)
          this.uiService.setDetault(GlobalConstants.postQuestionTitle);
      }
      return singlePost;
    }), catchError((error: HttpErrorResponse) => {
      console.log("ERROR", error);
      if (error.status == 400) {
        let customError = new CustomError();
        customError.errorCode = 400;
        return of({ error: customError });
      }
      if (error.status == 404 && error?.error?.errorMessage) {
        let customError = new CustomError();
        customError.errorCode = 404;
        customError.errorMessage = error?.error?.errorMessage;
        return of({ error: customError });
      }
      else {
        this.redirectToErrorPage();
        return of(undefined);
      }
    }));
  }

  redirectToErrorPage(): void {
    this.router.navigate(['/', GlobalConstants.error]);
  }
}