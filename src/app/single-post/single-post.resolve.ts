import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { SinglePost } from 'models/single-post.model';
import { map } from 'rxjs/operators';
import { UIService } from 'ui/ui.service';
import { SinglePostService } from './single-post.service';

@Injectable()
export class SinglePostResolve implements Resolve<Promise<SinglePost>> {

  constructor(private singlePostService: SinglePostService, private uiService: UIService) { }

  resolve(route: ActivatedRouteSnapshot): Promise<SinglePost> {
    return this.singlePostService.getSinglePost(route.paramMap.get('postSlug')).pipe(map((singlePost: SinglePost) => {
      this.uiService.setMetaTagsAndTitle('Post', singlePost.metaList);
      return singlePost;
    })).toPromise();
  }
}