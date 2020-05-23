import {Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {UserProfileCardServiceComponent} from '../user-profile-card/user-profile-card-service.component';
import {LoginService} from '../auth/login.service';
import {ActivatedRoute} from '@angular/router';
import {UserListComponent} from '../shared/components/dialogs/user-list/user-list.component';
import {MatDialog} from '@angular/material/dialog';
import {CommunityMembersService} from './community-members.service';
import {Community} from '../models/community.model';
import {User} from '../models/user.model';

@Component({
  selector: 'app-community-users',
  templateUrl: './community-users.component.html',
  styleUrls: ['./community-users.component.scss']
})
export class CommunityUsersComponent implements OnInit {
  baseUrl = environment.baseUrl;
  url: string;
  @Input() userListType;
  communityMemberList: User[] = [];
  loader = false;
  mobileView = false;
  screenWidth = window.innerWidth;

  constructor(public http: HttpClient, public userService: UserProfileCardServiceComponent, public loginService: LoginService, public route: ActivatedRoute,
              public dialog: MatDialog, public communityMembersService: CommunityMembersService) {
  }

  ngOnInit(): void {
    this.url = this.route.snapshot.paramMap.get('communitySlug');
    console.log(this.route.snapshot)
    this.getCommunityMembers();
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
  }

  getCommunityMembers() {
    this.loader = true;
    this.communityMembersService.getCommunityMembers(this.url, 0).subscribe((data: any) => {
      this.loader = false;
      data.content.map((value, index) => {
        this.communityMemberList.push(value);
      });
      // console.log(this.communityMemberList);
    }, error => {
      // console.log('something went wrong while fetching community Members.');
      this.loader = false;
    });
  }

  sendFollowInvite(i) {
    this.http.post(this.baseUrl + 'user/follow/user/' + i  , '').subscribe((res: any) => {
      console.log(res);
    }, error => {
      console.log(error.error.errorMessage);
    });
  }
  unfollowUser(userId) {
    const ownerId = this.loginService.getUserProfile().id;
    this.userService.unfollowMe(ownerId, userId).subscribe((res: any) => {

    }, error => {

    });
  }
  openUserGroupDialog(type): void {
    let config = null;
    if (this.mobileView) {
      config = {
        position: {
          top: '0',
          right: '0'
        },
        height: '100%',
        borderRadius: '0px',
        width: '100%',
        maxWidth: '100vw',
        marginTop: '0px',
        marginRight: '0px !important',
        panelClass: 'full-screen-modal',
        data: {userId: null, type}
      };
    } else {
      config = {
        width: '500px',
        // data: userList
        data: {userId: null, type}
      };
    }
    const dialogRef = this.dialog.open(UserListComponent, config);

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  checkImage(src) {
    if (src) {
      return src;
    } else {
      return '/assets/default.jpg';
    }
  }
  navigate(slug) {
    window.open('/user/' + slug, '_self');
  }
}
