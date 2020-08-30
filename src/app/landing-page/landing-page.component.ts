import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { loggedIn } from '@angular/fire/auth-guard';
// import {TranslateService} from '@ngx-translate/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MetaList } from 'models/common.model';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ApiService } from 'shared/api.service';
import { UIService } from 'ui/ui.service';
import { GlobalConstants } from '../shared/constants';
import { LoginService } from 'auth/login.service';
import { Title } from '@angular/platform-browser';
import { Page } from 'models/page.model';
import { HashTag } from 'models/hashtag.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss', '../home/home.component.scss'],
})

export class LandingPageComponent implements OnInit, OnDestroy {
  isLeftVisible = true;
  activeAuth = this.api.activeAuth;
  isLoading = false;
  hashtagInput = new FormControl();
  hashtagResults = [];
  hashTagPath = GlobalConstants.hashTagPath;
  communities = [
    { title: 'Music', src: 'assets/community/music.png', detail: 200 },
    { title: 'Business', src: 'assets/community/business.png', detail: 1200 },
    { title: 'Health', src: 'assets/community/health.png', detail: 400 },
    { title: 'Finance', src: 'assets/community/finance.png', detail: 300 },
    { title: 'Nature', src: 'assets/community/nature.png', detail: 550 },
    { title: 'Technology', src: 'assets/community/technology.png', detail: 2300 },
    { title: 'Beauty & Cosmetics', src: 'assets/community/beauty&cosmetics.png', detail: 300 },
    // { title: 'Transport', src: 'assets/community/transportation.png', detail: 255 },
    { title: 'Corona', src: 'assets/community/corona.png', detail: 1350 },
    { title: 'Fashion', src: 'assets/community/fashion.png', detail: 400 },
    // { title: 'Agriculture', src: 'assets/community/agriculture.png', detail: 130 },
    { title: 'Startup Community', src: 'assets/community/startup-community.png', detail: 530 }
  ];

  @ViewChild('main', { static: true }) mainContent: ElementRef;

  users = [
    { username: 'user1', totalFollowers: 2, totalPosts: 2, userRank: 12 },
    { username: 'user2', totalFollowers: 12, totalPosts: 7, userRank: 10 },
    { username: 'user3', totalFollowers: 4, totalPosts: 4, userRank: 2 },
    { username: 'user4', totalFollowers: 6, totalPosts: 5, userRank: 4 },
    { username: 'user5', totalFollowers: 8, totalPosts: 15, userRank: 3 },
  ];

  hashtags = [
    { hashTagValue: 'starfish' },
    { hashTagValue: 'coldplay' },
    { hashTagValue: 'platform' },
    { hashTagValue: 'newguy' },
    { hashTagValue: 'likescomments' },
    { hashTagValue: 'community' },
  ];

  metaList: MetaList[] = [];
  feedPath: string = GlobalConstants.feedPath;

  topHashtags = [];

  constructor(private titleService: Title, public api: ApiService, public router: Router, private uiService: UIService, private route: ActivatedRoute,
    private loginService: LoginService) {
    this.titleService.setTitle(GlobalConstants.welcomeTitle);
    this.hashtagInput.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.hashtagResults = [];
        }),
        distinctUntilChanged(),
      )
      .subscribe((val) => {
        if (val) {
          this.isLoading = true;
          this.searchHashtag();
        }
      });
  }

  getImgSrc(user) {
    if (user && user.avatarDTO) {
      return user.avatarDTO.avatarLink ? user.avatarDTO.avatarLink : null;
    }
  }

  ngOnInit() {
    this.route.data.subscribe((data: { siteTitle: string }) => {
    });
    if (this.loginService.loggedIn()) {
      this.router.navigate(['/', this.feedPath]);
    }
    // this.api.getTopUsers().subscribe(
    //   (res: any) => {
    //     if (res.content) {
    //       this.users = [...res.content].slice(0, 8);
    //     }
    //   }, err => {
    //   });
    this.api.getTopHashtags().subscribe(
      (res: any) => {
        if (res.content) {
          this.hashtags = res.content;
          this.topHashtags = [...this.hashtags].splice(0, 5);
        }
      }, err => {
      });
  }

  ngOnDestroy() {
    this.uiService.resetTitle();
  }

  searchHashtag() {
    this.api.searchHashtags(0, this.hashtagInput.value).subscribe(
      (res: Page<HashTag>) => {
        this.isLoading = false;
        this.hashtagResults = res.content;
      }
    );
  }

  goTo(val: string) {
    this.api.activeAuth = val;
    this.mainContent.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
