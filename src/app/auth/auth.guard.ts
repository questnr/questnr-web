import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CommunityService } from 'community/community.service';
import { MetaTagCard } from 'models/common.model';
import { UIService } from 'ui/ui.service';
import { LoginService } from './login.service';

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
    if (this.authService.loggedIn()) {
      return true;
    } else {
      if (next.paramMap.get('communitySlug')) {
        let metaTagsCard: MetaTagCard = await this.communityService.getCommunityMetaCard(next.paramMap.get('communitySlug')).toPromise();
        this.uiService.setMetaTagsAndTitle(metaTagsCard.title, metaTagsCard.metaList);
      } else {
        this.uiService.setDetault();
      }
      localStorage.clear();
      // this.router.navigateByUrl('/');
      this.router.navigate(['login'], { queryParams: { redirectURL: state.url } });
      return false;
    }
  }
}
