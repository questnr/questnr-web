import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from '../../../../auth/login.service';
import { Community, CommunityListType } from '../../../../models/community.model';
import { UsercommunityService } from '../../../../usercommunity/usercommunity.service';
import { ApiService } from '../../../api.service';
import { GlobalService } from 'global.service';
import { Page } from 'models/page.model';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.scss']
})
export class CommunityListComponent implements OnInit {
  mobileView: boolean = false;
  loader = false;
  page = 0;
  endOfResult: boolean = false;
  communityList: Community[] = [];
  userId: number;
  error: boolean = true;
  hasTotalPages: number;
  listTitle: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    page: number,
    userId: number,
    communityList: Community[],
    type: CommunityListType,
    isEnd: boolean
  },
    public dialogRef: MatDialogRef<CommunityListComponent>,
    public usercommunityService: UsercommunityService,
    public api: ApiService,
    public loginService: LoginService,
    private _globalService: GlobalService) {
    this.parseCommunityListData();
    if (this.data.userId) {
      this.userId = this.data.userId;
    } else {
      this.error = true;
    }
    if (this.data.page > 0 && this.data.isEnd != true && this.data.communityList.length > 0) {
      this.page = this.data.page;
      data.communityList.forEach(item => {
        this.communityList.push(item);
      });
    } else {
      this.loadMoreCommunity();
    }
  }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

  parseCommunityListData() {
    if (this.data.type === CommunityListType.owned) {
      this.listTitle = "Owned Communities";
    } else if (this.data.type === CommunityListType.joined) {
      this.listTitle = "Joined Communities";
    } else if (this.data.type === CommunityListType.suggested) {
      this.listTitle = "Communities You Might Like";
    }
  }

  loadMoreCommunity() {
    if (!this.endOfResult && !this.loader) {
      this.loader = true;
      if (this.data.type === CommunityListType.owned) {
        this.getUserOwnedCommunity();
      } else if (this.data.type === CommunityListType.joined) {
        this.getJoinedCommunities();
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getUserOwnedCommunity() {
    this.usercommunityService.getUserOwnedCommunity(this.userId, this.page)
      .subscribe((res: Page<Community>) => {
        if (res.content.length) {
          this.afterDataFetched(res.totalPages);
          res.content.forEach(community => {
            this.communityList.push(community);
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
    this.api.getJoinedCommunities(this.userId, this.page).subscribe(
      (res: Page<Community>) => {
        if (res.content.length) {
          this.afterDataFetched(res.totalPages);
          res.content.forEach(community => {
            this.communityList.push(community);
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

  afterDataFetched(totalPages) {
    this.hasTotalPages = totalPages;
    if (this.hasTotalPages == this.page + 1) {
      this.endOfResult = true;
    }
    this.page++;
    this.loader = false;
  }
}
