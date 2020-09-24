import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommunityBoxComponent } from 'community-box/community-box.component';
import { CommunityListMatCardType, CommunityListType } from 'models/community-list.model';
import { Page } from 'models/page.model';
import { User } from 'models/user.model';
import { Subject } from 'rxjs';
import { LoginService } from '../auth/login.service';
import { Community } from '../models/community.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-joined-community',
  templateUrl: './joined-community.component.html',
  styleUrls: ['./joined-community.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JoinedCommunityComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() userPageSubject: Subject<User>;
  @Input() followsCommunities: number;
  @Input() user: User;
  @Input() templateStyle: CommunityListMatCardType = CommunityListMatCardType.simple;
  userId: number;
  isOwner: boolean = false;
  CommunityListTypeClass = CommunityListType;
  CommunityListMatCardTypeClass = CommunityListMatCardType;
  @ViewChild("joinedCommunityBox") joinedCommunityBox: CommunityBoxComponent;

  constructor(public api: ApiService,
    public loginService: LoginService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.user = null;
  }

  ngAfterViewInit() {
    // user won't be set when we know that we want to render the component for owner
    if (this.userPageSubject) {
      this.userPageSubject.subscribe((user: User) => {
        this.user = user;
        this.fetchJoinedCommunityList();
      });
    }
    else {
      if (!this.user) {
        this.loginService.getUser().then((user: User) => {
          this.user = user;
          this.fetchJoinedCommunityList();
        });
      }
    }
  }

  setCommunityCount(followsCommunities: number) {
    this.followsCommunities = followsCommunities;
    this.joinedCommunityBox.startLoading(this.followsCommunities);
  }

  fetchJoinedCommunityList(): void {
    this.userId = this.user?.userId;
    if (this.loginService.isThisLoggedInUser(this.userId)) {
      this.isOwner = true;
    }
    this.api.getJoinedCommunities(this.userId, 0).subscribe(
      (res: Page<Community>) => {
        if (res.content.length) {
          this.joinedCommunityBox.setData(this.isOwner, res.content);
        } else {
          this.joinedCommunityBox.setData(this.isOwner, []);
        }
      }, err => {
        this.joinedCommunityBox.stopLoading();
      }
    );
  }
}
