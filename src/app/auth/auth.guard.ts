import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import { CommunityService } from 'community/community.service';
import { Community } from 'models/community.model';
import { map } from 'rxjs/operators';
import { UIService } from 'ui/ui.service';
import { MetaTagCard } from 'models/common.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: LoginService,
    private router: Router,
    private communityService: CommunityService,
    private uiService: UIService) { }

  handleUser(state: RouterStateSnapshot) {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      localStorage.clear();
      // this.router.navigateByUrl('/');
      this.router.navigate(['login'], { queryParams: { redirectURL: state.url } });
      return false;
    }
  }
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (next.paramMap.get('communitySlug')) {
      let metaTagsCard: MetaTagCard = await this.communityService.getCommunityMetaCard(next.paramMap.get('communitySlug')).toPromise();
      this.uiService.setMetaTagsAndTitle(metaTagsCard.title, metaTagsCard.metaList);
    } else {
      this.uiService.setDetault();
    }
    return this.handleUser(state);
  }
}
