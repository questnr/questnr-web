import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'auth/login.service';
import { CommunityBoxComponent } from 'community-box/community-box.component';
import { CommunityListMatCardType, CommunityListType } from 'models/community-list.model';
import { Community } from 'models/community.model';
import { Page } from 'models/page.model';
import { User } from 'models/user.model';
import { Subject } from 'rxjs';
import { UsercommunityService } from './usercommunity.service';

@Component({
  selector: 'app-usercommunity',
  templateUrl: './usercommunity.component.html',
  styleUrls: ['./usercommunity.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsercommunityComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() userPageSubject: Subject<User>;
  @Input() ownsCommunities: number;
  @Input() user: User;
  @Input() templateStyle: CommunityListMatCardType = CommunityListMatCardType.simple;
  userId: number;
  isOwner: boolean = false;
  CommunityListTypeClass = CommunityListType;
  CommunityListMatCardTypeClass = CommunityListMatCardType;
  @ViewChild("ownedCommunityBox") ownedCommunityBox: CommunityBoxComponent;

  constructor(public dialog: MatDialog,
    public http: HttpClient,
    public usercommunityService: UsercommunityService,
    private loginService: LoginService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.user = null;
  }

  ngAfterViewInit() {
    // user won't be set when we know that we want to render the component for owner
    if (this.userPageSubject) {
      this.userPageSubject.subscribe((user: User) => {
        this.user = user;
        this.fetchOwnedCommunityList();
      });
    }
    else {
      if (!this.user) {
        this.loginService.getUser().then((user: User) => {
          this.fetchOwnedCommunityList();
          this.user = user;
        });
      }
    }
  }

  setCommunityCount(ownsCommunities: number) {
    this.ownsCommunities = ownsCommunities;
    this.ownedCommunityBox.startLoading(this.ownsCommunities);
  }

  fetchOwnedCommunityList(): void {
    this.userId = this.user?.userId;
    if (this.loginService.isThisLoggedInUser(this.userId)) {
      this.isOwner = true;
    }
    this.usercommunityService.getUserOwnedCommunity(this.userId, 0).subscribe((res: Page<Community>) => {
      // console.log("OWNED COMMUNITES", res);
      if (res.content.length) {
        this.ownedCommunityBox.setData(this.isOwner, res.content);
      } else {
        this.ownedCommunityBox.setData(this.isOwner, []);
      }
    }, err => {
      this.ownedCommunityBox.stopLoading();
    });
  }
}
