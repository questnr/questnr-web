import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Post } from 'models/post-action.model';
import { GlobalConstants } from 'shared/constants';
import { LoginService } from '../auth/login.service';
import { ApiService } from '../shared/api.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-trend-post-question',
  templateUrl: './trend-post-question.component.html',
  styleUrls: ['./trend-post-question.component.scss']
})
export class TrendingPostPollQuestionComponent implements OnInit {
  @Input() trendingPostPollQuestionList: Post[];
  loadingTrendingPost = true;
  listItems = Array(5);
  screenWidth = window.innerWidth;
  mobileView = false;
  postPath: string = GlobalConstants.postPath;

  constructor(public api: ApiService, public loginService: LoginService, public dialog: MatDialog, private router: Router) {
    this.api.getTrendingPostPollQuestion().subscribe(
      (res: any) => {
        this.loadingTrendingPost = false;
        if (res.content.length) {
          this.trendingPostPollQuestionList = res.content;
        }
      }, err => { this.loadingTrendingPost = false; }
    );
  }

  ngOnInit(): void {
  }
}
