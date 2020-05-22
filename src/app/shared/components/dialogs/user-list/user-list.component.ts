import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../../models/user.model';
import {UserProfileCardServiceComponent} from '../../../../user-profile-card/user-profile-card-service.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserListService} from './user-list.service';
import {UserFollowersService} from '../../../../user-followers/user-followers.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  loading = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public  userProfileCardServiceComponent: UserProfileCardServiceComponent,
              public userListService: UserListService, public dialogRef: MatDialogRef<UserListComponent>, public followersService: UserFollowersService) {
  }

  userList: User[] = [];
  searchResultList: User;
  searchResult = false;
  noResultFound = false;
  mobileView = false;
  endOfResult = false;
  page = 0;
  screenWidth = window.innerWidth;

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
    // this.userList = this.data;
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
    if (this.data.type === 'following') {
      this.getFollowingUser(this.data.userId);
    } else {
      this.getFollowers(this.data.userId);
    }
  }

  scroll = (event): void => {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      console.log('no im  here');
      if (this.userList.length >= 0 && !this.endOfResult) {
        console.log('check network call');
        this.loading = true;
        ++this.page;
        if (this.data.type === 'following') {
          this.getFollowingUser(this.data.userId);
        } else {
          this.getFollowers(this.data.userId);
        }
        // this.getUserFeeds(this.userId);
      }
    }
  };

  getUserImage(src) {
    if (src == null) {
      return 'assets/default.jpg';
    } else {
      return src;
    }
  }

  follow(id) {
    this.userProfileCardServiceComponent.followMe(id).subscribe((res: any) => {
      console.log(res);
    }, error => {
      console.log(error.error.errorMessage);
    });
  }

  searchUserList(searchString) {
    this.noResultFound = false;
    this.loading = true;
    // tslint:disable-next-line:triple-equals
    if (searchString != '') {
      setTimeout(() => {
        this.userListService.searchUser(searchString).subscribe((res: any) => {
          console.log('serach resuult for :' + searchString + 'is===', res);
          this.searchResultList = res.content;
          this.searchResult = true;
          if (res.content.length === 0) {
            this.noResultFound = true;
          } else {
            this.noResultFound = false;
          }
          this.loading = false;
        }, error => {
          console.log(error.error.errorMessage);
          this.searchResult = false;
          this.loading = false;
          this.noResultFound = true;
        });
      }, 2000);
    } else {
      this.loading = false;
      this.searchResult = false;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getFollowers(userId) {
    console.log('test userId', userId);
    this.followersService.getUserFollowers(userId, this.page).subscribe((res: any) => {
      if (res.content.length) {
        res.content.forEach(user => {
          this.userList.push(user);
        });
      } else {
        this.endOfResult = true;
        this.loading = false;
      }
      console.log('follower content', this.userList);
    }, error => {
      console.log(error.error.errorMessage);
      this.loading = false;
    });
  }

  getFollowingUser(userId) {
    this.followersService.getFollowedBy(userId, this.page).subscribe((res: any) => {
      console.log('followed content' + res.content);
      if (res.content.length) {
        res.content.forEach(user => {
          this.userList.push(user);
          this.loading = false;
        });
      } else {
        this.loading = false;
        this.endOfResult = true;
      }
      console.log('follower content', this.userList);
    }, error => {
      console.log(error.error.errorMessage);
      this.loading = false;
    });
  }
}
