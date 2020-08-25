import { Component, OnInit, Input } from '@angular/core';
import { User } from 'models/user.model';
import { GlobalService } from 'global.service';
import { GlobalConstants } from 'shared/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'horizontal-owner-profile',
  templateUrl: './horizontal-owner-profile.component.html',
  styleUrls: ['./horizontal-owner-profile.component.scss']
})
export class HorizontalOwnerProfileComponent implements OnInit {
  @Input() user: User;
  mobileView: boolean = false;
  userPath: string = GlobalConstants.userPath;

  constructor(private _globalService: GlobalService, private router: Router) {
    this.mobileView = this._globalService.isMobileView();
  }

  ngOnInit(): void {
  }

  openUserProfile() {
    if (this.user?.slug) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/', this.userPath, this.user.slug])
      );

      window.open(url, '_blank');
    }
  }
}
