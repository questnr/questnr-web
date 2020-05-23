import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../auth/login.service';
import { Community } from '../models/community.model';
import { Post } from '../models/post-action.model';
import { User } from '../models/user.model';
import { DescriptionComponent } from '../shared/components/dialogs/description/description.component';
import { GlobalConstants } from '../shared/constants';
import { CommunityService } from './community.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  isSidenavopen = false;
  communitySlug: string;
  communityDTO: Community;
  owner: any;
  comUserList: any[];
  feeds: Post[];
  ownerDTO: User;
  comUpdatedAvatar: any;
  communityImage: any;
  loggedInUserId: any;
  page = 0;
  endOfPosts = false;
  userFeeds = [];
  loading = true;
  communityId: any;
  mobileView = false;

  constructor(public auth: CommunityService, public fb: FormBuilder, public dialog: MatDialog, public snackBar: MatSnackBar,
    private route: ActivatedRoute, public loginAuth: LoginService, private titleService: Title) {
    this.loggedInUserId = loginAuth.getUserProfile().id;
  }

  screenWidth = window.innerWidth;

  openCommunityDesc(desc: any, communityImg: any): void {
    // console.log();
    const dialogRef = this.dialog.open(DescriptionComponent, {
      width: '500px',
      // height: '300px',
      data: { text: desc, communityAvatar: communityImg }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
    this.communitySlug = this.route.snapshot.paramMap.get('communitySlug');
    this.route.data.subscribe((data: { community: Community }) => {
      this.communityDTO = data.community;
      this.communityImage = this.communityDTO.avatarDTO.avatarLink;
      this.ownerDTO = this.communityDTO.ownerUserDTO;
      this.owner = this.communityDTO.communityMeta.relationShipType;
      this.fetchCommunityFeeds(this.communityDTO.communityId);
    })
    // this.fetchCommunity(this.communitySlug);
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
      const el = document.querySelector('.flex-7');
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
  }

  ngOnDestroy() {
    this.titleService.setTitle(GlobalConstants.siteTitle);
  }

  scroll = (event): void => {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      // console.log('no im  here');
      if (this.userFeeds.length >= 0 && !this.endOfPosts) {
        // console.log('check network call', this.endOfPosts);
        this.loading = true;
        ++this.page;
        this.fetchCommunityFeeds(this.communityId);
      }
    }
  }

  followThisCommunty() {
    this.auth.followCommunity(this.communityDTO.communityId).subscribe((res: any) => {
      // console.log('started following' + this.communityDTO.communityName, res);
      this.owner = 'followed';
    }, error => {
      // console.log('failed to join this community', error.error.errorMessage);
      this.snackBar.open(error.error.errorMessage, 'close', { duration: 3000 });
    });
  }

  unfollowThisCommunity() {
    const userId = this.loginAuth.getUserProfile().id;
    this.auth.unfollowCommunityService(this.communityDTO.communityId, userId).subscribe((res: any) => {
      // console.log('unfollowed' + this.communityDTO.communityName, res);
      this.owner = '';
    }, error => {
      // console.log('failed to unfollow' + this.communityDTO.communityName, error.error.errorMessage);
    });
  }
  postFeed(event) {
    if (event.postActionId) {
      this.userFeeds = [event, ...this.userFeeds];
    } else {
      this.fetchCommunityFeeds(this.communityId);
    }
  }
  fetchCommunityFeeds(communityId) {
    this.communityId = communityId;
    this.auth.getCommunityFeeds(communityId, this.page).subscribe((res: any) => {
      if (res.content.length) {
        res.content.forEach(post => {
          // console.log(post);
          this.userFeeds.push(post);
        });
      } else {
        this.endOfPosts = true;
        this.loading = false;
      }
    }, error => {
      // console.log(error.error.errorMessage);
    });
  }

  changeCommunityAvatar() {
    const formData = new FormData();
    formData.set('file', this.comUpdatedAvatar, this.comUpdatedAvatar.name);
    this.auth.updateCommunityAvatar(formData, this.communityDTO.communityId).subscribe((res: any) => {
    }, error => {
    });
  }

  previewImage() {
    const src = document.getElementById('communityImageSrc').click();
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
