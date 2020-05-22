import {Component, Inject, OnInit} from '@angular/core';
import {UserListComponent} from '../user-list/user-list.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Community} from '../../../../models/community.model';
import {UsercommunityService} from '../../../../usercommunity/usercommunity.service';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.scss']
})
export class CommunityListComponent implements OnInit {
  mobileView = false;
  screenWidth = window.innerWidth;
  loader = true;
  page = 0 ;
  endOfResult = false;
  ownedCommunity: Community[] = [];
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CommunityListComponent>, public usercommunityService: UsercommunityService) {
  }

  ngOnInit(): void {
    // window.addEventListener('scroll', this.scroll, true);
    this.getUserOwnedCommunity();
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
  }
  // scroll = (event): void => {
  //   if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
  //     console.log('no im  here');
  //     if (this.ownedCommunity.length >= 0 && !this.endOfResult) {
  //       console.log('check network call');
  //       this.loader = true;
  //       ++this.page;
  //       this.getUserOwnedCommunity();
  //       // this.getUserFeeds(this.userId);
  //     }
  //   }
  // }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getUserOwnedCommunity() {
    this.loader = true;
    this.usercommunityService.getUserOwnedCommunity(this.data, this.page).subscribe((res: any) => {
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

}
