import { Component, OnInit } from '@angular/core';
import {GoogleLoginProvider} from 'angularx-social-login';
import {CommunityService} from './community.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {REGEX} from '../shared/constants';
import {CreateCommunityComponent} from '../shared/components/dialogs/create.community/create-community.component';
import {DescriptionComponent} from '../shared/components/dialogs/description/description.component';
import {MatDialog} from '@angular/material/dialog';
import {Community, CommunityUsers, OwnerUserDTO} from '../models/community.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoginService} from '../auth/login.service';
import { User } from '../models/user.model';


@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  isSidenavopen = false;
  url = (window.location.pathname).split('/')[2];
  communityDTO: Community;
  owner: any;
  comUserList: any[];
  feeds = [];
  ownerDTO: User;
  comUpdatedAvatar: any;
  communityImage: any;
  constructor(public auth: CommunityService, public fb: FormBuilder, public dialog: MatDialog, public snackBar: MatSnackBar, public loginAuth: LoginService) { }

  openCommunityDesc(desc: any, communityImg: any): void {
    // console.log();
    const dialogRef = this.dialog.open(DescriptionComponent, {
      width: '500px',
      // height: '300px',
      data: {  text : desc, communityAvatar: communityImg}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  ngOnInit() {
    this.fetchCommunity();
  }
  fetchCommunity() {
    // console.log(this.url);
    // this.userList = [];
    this.auth.getCommunityDetails(this.url).subscribe((res: Community) => {
      this.fetchCommunityFeeds(res.communityId);
      this.communityImage = res.avatarDTO.avatarLink;
      // res.communityUsers.map((value, index) => {
      //   this.userList.push(value);
      //   console.log(this.userList);
      // });
      this.communityDTO = res;
      this.ownerDTO = res.ownerUserDTO;
      this.owner = res.communityMeta.relationShipType;
      console.log('owner', this.owner);
    }, error => {
      // console.log('oops', error);
    });
  }

  followThisCommunty() {
    this.auth.followCommunity(this.communityDTO.communityId).subscribe((res: any) => {
      console.log('started following' + this.communityDTO.communityName, res);
      this.owner = 'followed';
    }, error => {
      console.log('failed to join this community', error.error.errorMessage);
      this.snackBar.open(error.error.errorMessage, 'close', { duration: 3000 });
    });
  }
  unfollowThisCommunity() {
    const userId = this.loginAuth.getUserProfile().id;
    this.auth.unfollowCommunityService(this.communityDTO.communityId, userId).subscribe((res: any) => {
      console.log('unfollowed' + this.communityDTO.communityName, res);
      this.owner = '';
    }, error => {
      console.log('failed to unfollow' + this.communityDTO.communityName, error.error.errorMessage);
    });
  }

  fetchCommunityFeeds(communityId) {
    this.auth.getCommunityFeeds(communityId).subscribe((res: any) => {
      // console.log(res.content);
      this.feeds = res.content;
    }, error => {
      // console.log(error);
    });
  }
  changeCommunityAvatar() {
    const formData = new FormData();
    formData.set('file', this.comUpdatedAvatar, this.comUpdatedAvatar.name);
    this.auth.updateCommunityAvatar(formData, this.communityDTO.communityId).subscribe((res: any) => {
      console.log();
    }, error => {
      console.log();
    });
  }
  previewImage() {
    const src = document.getElementById('imageSrc').click();
  }
  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.communityImage = reader.result as string;
        if (event.target.files.length > 0) {
          this.comUpdatedAvatar = event.target.files[0];
          this.changeCommunityAvatar();
        }
      };
    }
  }
}
