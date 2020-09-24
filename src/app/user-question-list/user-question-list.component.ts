import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'auth/login.service';
import { CardHeaderComponent } from 'card-header/card-header.component';
import { GlobalService } from 'global.service';
import { CardHeaderType } from 'models/card-header.model';
import { Page } from 'models/page.model';
import { Post } from 'models/post-action.model';
import { UserQuestionListModalData } from 'models/user-question.model';
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
  title: string = "User's Questions";
  @Input() totalQuestions: number;
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

  setData(user: User): void {
    this.user = user;
    this.isOwner = this.loginService.isThisLoggedInUser(this.user.userId);
    if (this.isOwner) {
      this.title = "Your Questions";
    }
    if (!this.mobileView) {
      this.getUserQuestions();
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

  private getUserQuestions() {
    this.loading = true;
    this.userQuestionSubscriber = this.userQuestionService.getUserQuestions(this.user.userId, String(this.page)).subscribe((questionPage: Page<Post>) => {
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
    data.user = this.user;
    data.page = this.page;
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
