import { Component, OnInit } from '@angular/core';
import {GoogleLoginProvider} from 'angularx-social-login';
import {CommunityService} from './community.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {REGEX} from '../shared/constants';
import {CreateCommunityComponent} from '../shared/components/dialogs/create.community/create-community.component';
import {DescriptionComponent} from '../shared/components/dialogs/description/description.component';
import {MatDialog} from '@angular/material/dialog';
import {Community, CommunityUsers, OwnerUserDTO} from './community.model';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  isSidenavopen = false;
  url = (window.location.pathname).split('/')[2];
  response: Community;
  owner: OwnerUserDTO;
  comUserList: CommunityUsers[];
  feeds = [];
  constructor(public auth: CommunityService, public fb: FormBuilder, public dialog: MatDialog) { }

  openCommunityDesc(event): void {
    console.log();
    const dialogRef = this.dialog.open(DescriptionComponent, {
      width: '500px',
      data: { desc : event.target.innerText}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  ngOnInit() {
    this.fetchCommunity();
  }
  fetchCommunity() {
    console.log(this.url);
    // this.userList = [];
    this.auth.getCommunityDetails(this.url).subscribe((res: Community) => {
      this.fetchCommunityFeeds(res.communityId);
      // res.communityUsers.map((value, index) => {
      //   this.userList.push(value);
      //   console.log(this.userList);
      // });
      this.response = res;
      console.log(this.response);
    }, error => {
      console.log('oops', error);
    });
  }
  toggle(_) {
    this.isSidenavopen = !this.isSidenavopen;
  }
  // getCommunityUser() {
  //   this.auth.getCommunityUserList(this.url).subscribe((data: any) => {
  //     data.content.map((value, index) => {
  //       this.comUserList.push(value);
  //     });
  //     console.log(data.content);
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  fetchCommunityFeeds(communityId) {
    this.auth.getCommunityFeeds(communityId).subscribe((res: any) => {
      console.log(res.content);
      this.feeds = res.content;
    }, error => {
      console.log(error);
    })
  }
}
