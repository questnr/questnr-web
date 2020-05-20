import {Component, Input, OnInit} from '@angular/core';
import {Community} from '../../../models/community.model';
import {ActivatedRoute} from '@angular/router';
import {CommunityService} from '../../../community/community.service';
import {LoginService} from '../../../auth/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-community-card-mobile-view',
  templateUrl: './community-card-mobile-view.component.html',
  styleUrls: ['./community-card-mobile-view.component.scss']
})
export class CommunityCardMobileViewComponent implements OnInit {
  constructor(public communityService: CommunityService, public loginService: LoginService, public snackBar: MatSnackBar) { }
  @Input() community: Community;
  relation: any;
  ngOnInit(): void {
    // this.relation = this.community.communityMeta.relationShipType;
  }

  routeToCommunity(slug) {
    window.open('/community/' + slug, '_self');
  }
  checkImageSrc(src) {
    if(src) {
      return src;
    } else {
      return 'assets/default.jpg';
    }
  }
  followThisCommunty(communityId) {
    this.communityService.followCommunity(communityId).subscribe((res: any) => {
      console.log('started following' + res);
      this.relation = 'followed';
    }, error => {
      console.log('failed to join this community', error.error.errorMessage);
      this.snackBar.open(error.error.errorMessage, 'close', {duration: 3000});
    });
  }

  unfollowThisCommunity(communityId) {
    const userId = this.loginService.getUserProfile().id;
    this.communityService.unfollowCommunityService(communityId, userId).subscribe((res: any) => {
      console.log('unfollowed' , res);
      this.relation = 'none';
    }, error => {
      console.log('failed to unfollow' , error.error.errorMessage);
    });
  }
}
