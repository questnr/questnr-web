import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'global.service';
import { Community } from 'models/community.model';
import { Page } from 'models/page.model';
import { Post } from 'models/post-action.model';
import { UserQuestionListModalData, UserQuestionListModalType } from 'models/user-question.model';
import { User } from 'models/user.model';
import { Subscription } from 'rxjs';
import { UserQuestionLoaderComponent } from 'user-question-list/user-question-loader/user-question-loader.component';
import { UserQuestionService } from 'user-question-list/user-question.service';

@Component({
  selector: 'app-user-question-list-modal',
  templateUrl: './user-question-list-modal.component.html',
  styleUrls: ['./user-question-list-modal.component.scss']
})
export class UserQuestionListModalComponent implements OnInit {
  user: User;
  community: Community;
  title: string;
  type: UserQuestionListModalType = UserQuestionListModalType.user;
  loading: boolean = true;
  questionList: Post[] = [];
  totalCounts: number;
  isOwner: boolean = false;
  mobileView: boolean = false;
  endOfResult = false;
  page: number = 0;
  hasTotalPage: number;
  scrollCached: boolean = null;
  userQuestionSubscriber: Subscription;
  @ViewChild("listContainer") listContainer: ElementRef;
  questionLoaderRef: UserQuestionLoaderComponent
  @ViewChild("questionLoader")
  set questionLoader(questionLoaderRef: UserQuestionLoaderComponent) {
    this.questionLoaderRef = questionLoaderRef;
  }
  fetchingFunc: Function;
  uniqueId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserQuestionListModalData,
    public dialogRef: MatDialogRef<UserQuestionListModalComponent>,
    private userQuestionService: UserQuestionService,
    private _globalService: GlobalService) {
    if (data) {
      this.title = data.title;
      this.totalCounts = data.totalCounts;
      if (data.page > 0) {
        this.page = data.page;
        this.questionList = data.questionList;
      }
      this.endOfResult = data.isEnd;
      this.isOwner = data.isOwner;
      this.type = data.type;
      if (this.type === UserQuestionListModalType.user) {
        this.user = data.user;
        this.uniqueId = data.user?.userId;
        this.fetchingFunc = (...args) => {
          if (args.length === 2)
            return this.userQuestionService.getUserQuestions(args[0], args[1]);
        };
      } else if (this.type === UserQuestionListModalType.community) {
        this.community = data.community;
        this.uniqueId = data.community?.communityId;
        this.fetchingFunc = (...args) => {
          if (args.length === 2)
            return this.userQuestionService.getCommunityQuestions(args[0], args[1]);
        };
      }
    }
  }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

  ngAfterViewInit() {
    this.loading = true;
    this.fetchData();
    this.listContainer.nativeElement.addEventListener('scroll', this.onScroll, true);
    this.mobileView = this._globalService.isMobileView();
    this.questionLoaderRef.setListItems(this.totalCounts < 5 ? this.totalCounts : 4);
    let timer = setInterval(() => {
      if (!this.loading) {
        clearInterval(timer);
        if (this.hasTotalPage > this.page) {
          this.loading = true;
          this.fetchData();
        }
      }
    }, 1000);
  }

  onScroll = (event): void => {
    if (!this.scrollCached) {
      setTimeout(() => {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 300) {
          // console.log('no im  here');
          if (this.questionList.length >= 0 && !this.endOfResult) {
            // console.log('check network call');
            if (!this.loading && this.hasTotalPage > this.page) {
              this.fetchData();
            }
          }
        }
        this.scrollCached = null;
      }, 100);
    }
    this.scrollCached = event;
  };

  ngOnDestroy() {
    if (this.userQuestionSubscriber) {
      this.userQuestionSubscriber.unsubscribe();
    }
    this.listContainer.nativeElement.removeEventListener('scroll', this.onScroll, true);
  }

  fetchData() {
    this.loading = true;
    if (!this.fetchingFunc) return;
    this.userQuestionSubscriber = this.fetchingFunc(
      this.uniqueId, String(this.page)).subscribe((questionPage: Page<Post>) => {
        if (questionPage.content.length) {
          this.hasTotalPage = questionPage.totalPages;
          this.page++;
          this.endOfResult = questionPage.last;
          this.loading = false;
          questionPage.content.forEach(question => {
            this.questionList.push(question);
          });
        } else {
          this.loading = false;
          this.endOfResult = true;
        }
      }, error => {
        this.loading = false;
      });
  }

  backActionListener(): void {
    this.dialogRef.close();
  }
}
