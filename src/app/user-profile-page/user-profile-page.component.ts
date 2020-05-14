import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserProfileCardServiceComponent} from '../user-profile-card/user-profile-card-service.component';
import {UserProfilePageService} from './user-profile-page.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../models/user.model';
import {UserFollowersService} from '../user-followers/user-followers.service';
import {LoginService} from '../auth/login.service';
import {ApiService} from '../shared/api.service';
import {Post} from '../models/post-action.model';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent implements OnInit {
  constructor( public userProfilePageService: UserProfilePageService, public route: ActivatedRoute, public userFollowersService: UserProfileCardServiceComponent,
               public loginService: LoginService, public api: ApiService) { }
  feeds: Post[];
  url: string;
  user: User;
  userAvatarImage = 'assets/default.jpg';
  stats: any;
  relation: any;
  loading = false;
  page = 0;
  endOfPosts = false;
  userFeeds = [];
  userId: any;

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
    this.url = this.route.snapshot.paramMap.get('userSlug');
    this.getUserProfileDetails();
    // this.getUserInfo();
    this.getCommunityFollowedByUser();
  }
  scroll = (event): void => {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      console.log('no im  here');
      if (this.userFeeds.length >= 0 && !this.endOfPosts) {
        console.log('check network call', this.endOfPosts);
        this.loading = true;
        ++this.page;
        this.getUserFeeds(this.userId);
      }
    }
  }
  postFeed(event) {
    if (event.postActionId) {
      this.userFeeds = [event, ...this.userFeeds];
    } else {
      this.getUserFeeds(this.userId);
    }
  }
  getUserFeeds(userId) {
    this.userProfilePageService.getUserFeeds(userId, this.page).subscribe((res: any) => {
      if (res.content.length) {
        res.content.forEach(post => {
          this.userFeeds.push(post);
        });
      } else {
        this.endOfPosts = true;
        this.loading = false;
      }
    }, error => {
      this.loading = false;
    });
    }
  getUserProfileDetails() {
    this.userProfilePageService.getUserProfile(this.url).subscribe((res: any) => {
      this.user = res;
      this.userAvatarImage =  res.avatarDTO.avatarLink;
      this.relation = res.userMeta.relationShipType;
      console.log("relation" , this.relation);
      this.userId = res.userId;
      this.getUserFeeds(res.userId);
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
    if (event.target.files && event.target.files.length) {
      const formData: FormData = new FormData();
      file = event.target.files[0];
      formData.set('file', file, file.name);
      this.userProfilePageService.updateProfilePicture(formData).subscribe((res: any) => {
        console.log(res);
        this.userAvatarImage = res.avatarLink;
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
    this.api.getJoinedCommunities().subscribe((res: any) => {
      console.log(res);
    }, error => {
      console.log(error.error.errorMessage);
    });
  }
  getImageUrl(url) {
    if (url) {
      return url ;
    } else {
      return 'assets/default.jpg';
    }
  }
}
