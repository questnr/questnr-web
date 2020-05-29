import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'models/page.model';
import { UIService } from 'ui/ui.service';
import { LoginService } from '../auth/login.service';
import { Community } from '../models/community.model';
import { Post } from '../models/post-action.model';
import { User } from '../models/user.model';
import { DescriptionComponent } from '../shared/components/dialogs/description/description.component';
import { CommunityService } from './community.service';
import { CommunityUsersComponent } from 'community-users/community-users.component';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  @ViewChild("feedPartRef") feedPartRef: ElementRef;
  communityUsersComponentRef: CommunityUsersComponent;
  @ViewChild('communityUsersComponentRef') set content(content: CommunityUsersComponent) {
    if (content) { // initially setter gets called with undefined
      this.communityUsersComponentRef = content;
    }
  }
  isSidenavopen = false;
  communitySlug: string;
  communityDTO: Community;
  owner: any;
  comUserList: any[];
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
  screenWidth = window.innerWidth;
  scrollCached: boolean = null;

  constructor(public auth: CommunityService, public fb: FormBuilder, public dialog: MatDialog, public snackBar: MatSnackBar,
    private route: ActivatedRoute, public loginAuth: LoginService, private uiService: UIService, private router: Router) {
    this.loggedInUserId = loginAuth.getUserProfile().id;
  }
  public trackItem(index: number, feed: Post) {
    return feed.slug;
  }

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
    this.communitySlug = this.route.snapshot.paramMap.get('communitySlug');
    this.route.data.subscribe((data: { community: Community }) => {
      this.communityDTO = data.community;
      this.communityImage = this.communityDTO.avatarDTO.avatarLink;
      this.ownerDTO = this.communityDTO.ownerUserDTO;
      this.owner = this.communityDTO.communityMeta.relationShipType;
      this.userFeeds = [];
      this.fetchCommunityFeeds(this.communityDTO.communityId);
    });
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngAfterViewInit() {
    window.addEventListener('scroll', this.scroll, true);
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
    window.removeEventListener('scroll', this.scroll, true);
    this.uiService.resetTitle();
  }

  scroll = (event): void => {
    if (!this.scrollCached) {
      setTimeout(() => {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 300) {
          // console.log('no im  here');
          if (this.userFeeds.length >= 0 && !this.endOfPosts) {
            // console.log('check network call', this.endOfPosts);
            this.loading = true;
            ++this.page;
            this.fetchCommunityFeeds(this.communityId);
          }
        }
        this.scrollCached = null;
      }, 100);
    }
    this.scrollCached = event;
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
    this.auth.getCommunityFeeds(communityId, this.page).subscribe((res: Page<Post>) => {
      if (res.content.length) {
        res.content.forEach(post => {
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
  navigate(slug) {
    window.open('/user/' + slug, '_self');
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

  actionEvent($event) {
    this.owner = $event;
    this.communityUsersComponentRef.ngOnInit();
  }
}
