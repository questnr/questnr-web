import { Component, Inject, OnInit } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Community } from '../../../../models/community.model';
import { UsercommunityService } from '../../../../usercommunity/usercommunity.service';
import { ApiService } from '../../../api.service';
import { LoginService } from '../../../../auth/login.service';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.scss']
})
export class CommunityListComponent implements OnInit {
  mobileView = false;
  screenWidth = window.innerWidth;
  loader = false;
  page = 0;
  endOfResult = false;
  ownedCommunity: Community[] = [];
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CommunityListComponent>, public usercommunityService: UsercommunityService, public api: ApiService
    , public loginService: LoginService) {
    data.community.forEach(item => {
      this.ownedCommunity.push(item);
    });
  }

  ngOnInit(): void {
    // window.addEventListener('scroll', this.scroll, true);
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
  }
  // ngAfterViewInit() {
  //   // this.getUserOwnedCommunity();
  // }
  // scroll = (event): void => {
  //   if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 300) {
  //     console.log('no im  here');
  //     if (this.ownedCommunity.length >= 0 && !this.endOfResult) {
  //       console.log('check network call');
  //       this.loader = true;
  //       ++this.page;
  //       if (this.data.type === 'ownedCommunity') {
  //         this.getUserOwnedCommunity(this.data.userId);
  //       } else {
  //         this.getJoinedCommunities();
  //       }
  //     }
  //   }
  // }
  loadMoreCommunity() {
    if (this.ownedCommunity.length >= 0 && !this.endOfResult) {
      // console.log('check network call');
      this.loader = true;
      ++this.page;
      if (this.data.type === 'ownedCommunity') {
        if (this.data.userId)
          this.getUserOwnedCommunity(this.data.userId);
      } else {
        this.getJoinedCommunities();
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getUserOwnedCommunity(userId) {
    this.loader = true;
    this.usercommunityService.getUserOwnedCommunity(userId, this.page).subscribe((res: any) => {
      if (res.content.length) {
        res.content.forEach(community => {
          this.ownedCommunity.push(community);
        });
      } else {
        this.endOfResult = true;
      }
      this.loader = false;
    }, error => {
      this.loader = false;
      this.endOfResult = true;
    });
  }

  getJoinedCommunities() {
    this.api.getJoinedCommunities(this.loginService.getUserId(), this.page).subscribe(
      (res: any) => {
        if (res.content.length) {
          res.content.forEach(community => {
            this.ownedCommunity.push(community);
          });
        } else {
          this.endOfResult = true;
        }
        this.loader = false;
      }, err => {
        this.loader = false;
        this.endOfResult = true;
      }
    );
  }
}
