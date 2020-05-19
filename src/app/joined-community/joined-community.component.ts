import {Component, Input, OnInit} from '@angular/core';
import {Community} from '../models/community.model';
import {LoginService} from '../auth/login.service';
import {ApiService} from '../shared/api.service';

@Component({
  selector: 'app-joined-community',
  templateUrl: './joined-community.component.html',
  styleUrls: ['./joined-community.component.scss']
})
export class JoinedCommunityComponent implements OnInit {
  @Input() joinedCommunity: Community;
  loadingCommunities = true;
  constructor(public api: ApiService, public loginService: LoginService) { }

  ngOnInit(): void {
    this.api.getJoinedCommunities(this.loginService.getUserId()).subscribe(
      (res: any) => {
        this.loadingCommunities = false;
        if (res.content.length) {
          this.joinedCommunity = res.content;
        }
      }, err => { this.loadingCommunities = false; }
    );
  }
  checkImageUrl(src) {
    if (src) {
      return src;
    } else {
      return  '/assets/default.jpg';
    }
  }
}
