import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'auth/login.service';
import { CardHeaderComponent } from 'card-header/card-header.component';
import { GlobalService } from 'global.service';
import { CardHeaderType } from 'models/card-header.model';
import { Community } from 'models/community.model';
import { Page } from 'models/page.model';
import { Post } from 'models/post-action.model';
import { UserQuestionListModalData, UserQuestionListModalType } from 'models/user-question.model';
import { User } from 'models/user.model';
import { Subscription } from 'rxjs';
import { UserQuestionListModalComponent } from './user-question-list-modal/user-question-list-modal.component';
import { UserQuestionLoaderComponent } from './user-question-loader/user-question-loader.component';
import { UserQuestionService } from './user-question.service';

@Component({
  selector: 'app-user-question-list',
  templateUrl: './user-question-list.component.html',
  styleUrls: ['./user-question-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserQuestionListComponent implements OnInit {
  user: User;
  community: Community;
  title: string = "Questions";
  @Input() totalQuestions: number;
  @Input() type: UserQuestionListModalType = UserQuestionListModalType.user;
  loading: boolean = true;
  isOwner: boolean = false;
  mobileView: boolean = false;
  questionList: Post[] = [];
  page: number = 0;
  questionLoaderRef: UserQuestionLoaderComponent;
  @ViewChild("questionLoader")
  set questionLoader(questionLoaderRef: UserQuestionLoaderComponent) {
    this.questionLoaderRef = questionLoaderRef;
  }
  cardHeaderRef: CardHeaderComponent;
  @ViewChild("cardHeader")
  set cardHeader(cardHeaderRef: CardHeaderComponent) {
    this.cardHeaderRef = cardHeaderRef;
  }
  cardHeaderTypeClass = CardHeaderType;
  userQuestionSubscriber: Subscription;
  pageSize: number = 4;
  fetchingFunc: Function;
  uniqueId: number;

  constructor(private userQuestionService: UserQuestionService,
    private loginService: LoginService,
    public dialog: MatDialog,
    public _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

  ngOnDestroy() {
    if (this.userQuestionSubscriber) {
      this.userQuestionSubscriber.unsubscribe();
    }
  }

  setUserData(user: User): void {
    this.user = user;
    this.type = UserQuestionListModalType.user;
    this.isOwner = this.loginService.isThisLoggedInUser(this.user.userId);
    if (this.isOwner) {
      this.title = "Your Questions";
    } else {
      this.title = "User's Questions";
    }
    if (!this.mobileView) {
      this.uniqueId = this.user?.userId;
      this.fetchingFunc = (...args) => {
        if (args.length === 2)
          return this.userQuestionService.getUserQuestions(args[0], args[1]);
      };
      this.getQuestions();
    }
  }

  setCommunityData(community: Community): void {
    this.community = community;
    this.type = UserQuestionListModalType.community;
    this.isOwner = this.loginService.isThisLoggedInUser(this.community?.ownerUserDTO?.userId);
    if (this.isOwner) {
      this.title = "Your Community's Questions";
    } else {
      this.title = "Community's Questions";
    }
    if (!this.mobileView) {
      this.uniqueId = this.community?.communityId;
      this.fetchingFunc = (...args) => {
        if (args.length === 2)
          return this.userQuestionService.getCommunityQuestions(args[0], args[1]);
      };
      this.getQuestions();
    }
  }

  setTotalCounts(totalQuestions: number) {
    this.totalQuestions = totalQuestions;
    this.questionLoaderRef?.setListItems(this.totalQuestions < 5 ? this.totalQuestions : 4);
    if (this.mobileView) {
      this.cardHeaderRef.setCount(this.totalQuestions);
      this.cardHeaderRef.setShouldArrow(this.totalQuestions > 0);
    }
  }

  private getQuestions() {
    this.loading = true;
    if (!this.fetchingFunc) return;
    this.userQuestionSubscriber = this.fetchingFunc(
      this.uniqueId, String(this.page)).subscribe((questionPage: Page<Post>) => {
        this.loading = false;
        if (questionPage.content.length) {
          this.userQuestionSubscriber.unsubscribe();
          this.page++;
          this.questionList = questionPage.content;
        }
      });
  }

  openQuestionListDialog() {
    let config = null;
    const data = new UserQuestionListModalData();
    data.questionList = this.questionList;
    if (this.type === UserQuestionListModalType.user) {
      data.user = this.user;
    } else if (this.type === UserQuestionListModalType.community) {
      data.community = this.community;
    }
    data.page = this.page;
    data.type = this.type;
    data.title = this.title;
    data.totalCounts = this.totalQuestions;
    data.isOwner = this.isOwner;
    data.isEnd = this.totalQuestions <= this.questionList?.length;
    if (this.mobileView) {
      config = {
        position: {
          top: '0',
          right: '0'
        },
        height: '100%',
        borderRadius: '0px',
        width: '100%',
        maxWidth: '100vw',
        marginTop: '0px',
        marginRight: '0px !important',
        panelClass: 'user-list-modal',
        overflow: "hidden",
        data: data
      };
    } else {
      config = {
        // width: '500px',
        // data: userList,
        maxHeight: '70vh',
        maxWidth: "80vw",
        panelClass: 'user-list-modal',
        overflow: "hidden",
        data: data
      };
    }
    const dialogRef = this.dialog.open(UserQuestionListModalComponent, config);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
