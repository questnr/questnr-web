import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserProfileCardServiceComponent } from '../user-profile-card/user-profile-card-service.component';
import { UserProfilePageService } from './user-profile-page.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { UserFollowersService } from '../user-followers/user-followers.service';
import { LoginService } from '../auth/login.service';
import { ApiService } from '../shared/api.service';
import { Post } from '../models/post-action.model';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent implements OnInit {
  constructor(public userProfilePageService: UserProfilePageService, public route: ActivatedRoute, public userFollowersService: UserProfileCardServiceComponent,
    public loginService: LoginService, public api: ApiService) { }
  feeds: Post[];
  url: string;
  user: User;
  userAvatarImage = 'assets/default.jpg';
  stats: any;
  relation: any;

  ngOnInit(): void {
    this.url = this.route.snapshot.paramMap.get('userSlug');
    this.getUserFeeds();
    this.getUserProfileDetails();
    // this.getUserInfo();
    this.getCommunityFollowedByUser();
  }
  getUserFeeds() {
    this.userProfilePageService.getUserFeeds().subscribe((res: any) => {
      console.log(res);
      this.feeds = res.content;
    }, error => {

    });
  }
  getUserProfileDetails() {
    this.userProfilePageService.getUserProfile(this.url).subscribe((res: any) => {
      this.user = res;
      this.userAvatarImage = res.avatarDTO.avatarLink;
      this.relation = res.userMeta.relationShipType;
      console.log("relation", this.relation);
    }, error => {
      console.log(error.error.errorMessage);
    });
  }
  // getUserInfo() {
  //   this.userProfilePageService.getUserInfo(this.url).subscribe((res: any) => {
  //     this.stats = res;
  //   }, error => {
  //     console.log(error.error.errorMessage);
  //   });
  // }
  updateUserAvatar(event) {
    let file = null;
    const formData = new FormData();
    if (event.target.files && event.target.files.length) {
      file = event.target.files[0];
      formData.set('file', file, file.name);
      this.userProfilePageService.updateProfilePicture(file).subscribe((res: any) => {
        console.log(res);
      }, error => {
        console.log(error.error.errorMessage);
      });
    } else {
      console.log('Upload valid Picture');
    }
  }

  triggerFalseClick() {
    const src = document.getElementById('fileInput').click();
  }
  follow(id) {
    this.userFollowersService.followMe(id).subscribe((res: any) => {
      console.log(res);
      this.relation = 'followed';
    }, error => {
      console.log(error.error.errorMessage);
    });
  }
  unfollow(id) {
    const ownerId = this.loginService.getUserProfile().id;
    this.userFollowersService.unfollowMe(ownerId, id).subscribe((res: any) => {
      console.log(res);
      this.relation = 'none';
    }, error => {
      console.log(error.error.errorMessage);
    });
  }
  getCommunityFollowedByUser() {
    this.api.getJoinedCommunities(this.loginService.getUserId()).subscribe((res: any) => {
    }, error => {
      console.log(error.error.errorMessage);
    });
  }
}
