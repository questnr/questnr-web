import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from 'global.service';
import { RelationType } from 'models/relation-type';
import { GlobalConstants } from 'shared/constants';
import { LoginService } from '../../../auth/login.service';
import { CommunityService } from '../../../community/community.service';
import { Community } from '../../../models/community.model';

@Component({
  selector: 'app-community-card-mobile-view',
  templateUrl: './community-card-mobile-view.component.html',
  styleUrls: ['./community-card-mobile-view.component.scss']
})
export class CommunityCardMobileViewComponent implements OnInit {
  @Input() community: Community;
  @Input() allowAction: boolean;
  relation: RelationType;
  communityPath: string = GlobalConstants.communityPath;
  mobileView: boolean = false;
  globalConstantsClass = GlobalConstants;

  constructor(public communityService: CommunityService,
    public loginService: LoginService,
    public snackBar: MatSnackBar,
    private _globalService: GlobalService
  ) { }

  ngOnInit(): void {
    // this.relation = this.community.communityMeta.relationShipType;
  }
  ngAfterViewInit() {
    this.mobileView = this._globalService.isMobileView();
    // console.log("allowAction", this.allowAction);
    if (typeof this.allowAction == 'undefined' || this.allowAction) {
      this.allowAction = true;
    } else {
      this.allowAction = false;
    }
    this.relation = this.community?.communityMeta?.relationShipType;
  }

  // routeToCommunity(slug) {
  //   window.open([GlobalConstants.communityPath, slug].join("/"), '_blank');
  // }

  actionEvent($event) {
    this.relation = $event;
  }

  followThisCommunty(communityId) {
    this.communityService.followCommunity(communityId).subscribe((res: any) => {
      // console.log('started following' + res);
      // this.relation = RelationType.FOLLOWED;
      this.relation = res.relationShipType;
    }, error => {
      // console.log('failed to join this community', error.error.errorMessage);
      this.snackBar.open(error.error.errorMessage, 'close', { duration: 3000 });
    });
  }

  unfollowThisCommunity(communityId) {
    const userId = this.loginService.getLocalUserProfile().id;
    this.communityService.unfollowCommunityService(communityId, userId).subscribe((res: any) => {
      // console.log('unfollowed', res);
      this.relation = RelationType.NONE;
    }, error => {
      // console.log('failed to unfollow', error.error.errorMessage);
    });
  }
}
