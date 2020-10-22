import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../auth/login.service';
import { GlobalService } from '../global.service';
import { Post } from '../models/post-action.model';
import { ApiService } from '../shared/api.service';
import { GlobalConstants } from '../shared/constants';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-trend-post-question',
  templateUrl: './trend-post-question.component.html',
  styleUrls: ['./trend-post-question.component.scss']
})
export class TrendPostQuestionComponent implements OnInit {
  @Input() trendingPostPollQuestionList: Post[];
  loadingTrendingPost = true;
  listItems = Array(5);
  mobileView: boolean = false;
  postQuestionPath: string = GlobalConstants.postQuestionPath;

  constructor(public api: ApiService, public loginService: LoginService, public dialog: MatDialog, private router: Router,
    private _globalService: GlobalService) {
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
    this.mobileView = this._globalService.isMobileView();
  }
}
