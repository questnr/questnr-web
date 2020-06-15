import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserProfileCardServiceComponent } from '../user-profile-card/user-profile-card-service.component';
import { LoginService } from '../auth/login.service';
import { ActivatedRoute } from '@angular/router';
import { UserListComponent } from '../shared/components/dialogs/user-list/user-list.component';
import { MatDialog } from '@angular/material/dialog';
import { CommunityMembersService } from './community-members.service';
import { Community, CommunityProfileMeta } from '../models/community.model';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-community-users',
  templateUrl: './community-users.component.html',
  styleUrls: ['./community-users.component.scss']
})
export class CommunityUsersComponent implements OnInit {
  baseUrl = environment.baseUrl;
  @Input() communitySlug: string;
  @Input() userListType;
  @Input() ownerUser: User;
  @Input() communityId;
  communityMemberList: User[] = [];
  loader = false;
  mobileView = false;
  screenWidth = window.innerWidth;
  numberOfMembers: string;
  loggedInUserId;

  constructor(public http: HttpClient, public userService: UserProfileCardServiceComponent, public loginService: LoginService, public route: ActivatedRoute,
    public dialog: MatDialog, public communityMembersService: CommunityMembersService, private loginAuth: LoginService) {
    this.loggedInUserId = loginAuth.getUserProfile().id;
  }

  ngOnInit(): void {
    this.getCommunityMembers(this.communitySlug);
    this.getCommunityMetaInfo(this.communitySlug);
  }

  ngAfterViewInit() {
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.communitySlug) {
      this.getCommunityMembers(changes.communitySlug.currentValue);
    }
  }

  getCommunityMembers(communitySlug: string) {
    this.loader = true;
    this.communityMembersService.getCommunityMembers(communitySlug, 0).subscribe((data: any) => {
      this.loader = false;
      this.communityMemberList = data.content;
      // console.log(this.communityMemberList);
    }, error => {
      // console.log('something went wrong while fetching community Members.');
      this.loader = false;
    });
  }

  getCommunityMetaInfo(communitySlug: string) {
    this.communityMembersService.getCommunityMetaInfo(communitySlug).subscribe((data: CommunityProfileMeta) => {
      this.numberOfMembers = data.followers;
    });
  }

  sendFollowInvite(i) {
    if (!i) return of();
    this.http.post(this.baseUrl + 'user/follow/user/' + i, '').subscribe((res: any) => {
      // console.log(res);
    }, error => {
      // console.log(error.error.errorMessage);
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
        data: { communitySlug: this.communitySlug, type }
      };
    } else {
      config = {
        width: '500px',
        maxHeight: '60vh',
        // data: userList
        data: { communitySlug: this.communitySlug, type }
      };
    }
    const dialogRef = this.dialog.open(UserListComponent, config);

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  openUserGroupDialogToInvite(): void {
    let config = null;
    let type = 'inviteUserList';
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
        data: {
          userId: this.loggedInUserId,
          communityId: this.communityId,
          type
        }
      };
    } else {
      config = {
        width: '500px',
        // data: userList,
        maxHeight: "60vh",
        data: {
          userId: this.loggedInUserId,
          communityId: this.communityId,
          type
        }
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
