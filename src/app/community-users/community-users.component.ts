import {Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {UserProfileCardServiceComponent} from '../user-profile-card/user-profile-card-service.component';
import {LoginService} from '../auth/login.service';
import {ActivatedRoute} from '@angular/router';
import {UserListComponent} from '../shared/components/dialogs/user-list/user-list.component';
import {MatDialog} from '@angular/material/dialog';
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
  @Input() ownerUser: User;
  communityMemberList: User[] = [];
  loader = false;

  constructor(public http: HttpClient, public userService: UserProfileCardServiceComponent, public loginService: LoginService, public route: ActivatedRoute,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.url = this.route.snapshot.paramMap.get('communitySlug');
    this.getCommunityMembers();

  }

  getCommunityMembers() {
    this.loader = true;
    this.http.get(this.baseUrl + 'user/community/' + this.url + '/users').subscribe((data: any) => {
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
  openUserGroupDialog(userList): void {
    const dialogRef = this.dialog.open(UserListComponent, {
      width: '500px',
      data: userList
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
