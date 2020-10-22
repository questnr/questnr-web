import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../auth/login.service';
import { SnackBarService } from '../common/snackbar.service';
import { KnowMoreLinkType } from '../models/know-more-type';
import { PollQuestionMeta, Post, QuestionParentType } from '../models/post-action.model';
import { ActionType } from '../models/snackbar.model';
import { AskQuestionService } from '../shared/components/dialogs/ask-question/ask-question.service';
import { GlobalConstants } from '../shared/constants';
import { Message } from '../shared/constants/messages';

@Component({
  selector: 'app-question-ui',
  templateUrl: './question-ui.component.html',
  styleUrls: ['./question-ui.component.scss']
})
export class QuestionUIComponent implements OnInit {
  @Input() question: Post;
  @Output() removePostEvent = new EventEmitter();
  @ViewChild('agree') agree: ElementRef;
  @ViewChild('disagree') disagree: ElementRef;
  @ViewChild('respondedDisagree') respondedDisagree: ElementRef;
  @ViewChild('respondedAgree') respondedAgree: ElementRef;
  @Input() questionParentType: QuestionParentType;
  @Output() respondingActionEvetnt = new EventEmitter();
  userPath = GlobalConstants.userPath;
  agreePercentage: string;
  disagreePercentage: string;
  isResponded: boolean = false;
  totalAnswered: number = 0;
  showUserHeader: boolean = true;
  isOwner: boolean = false;
  loading: boolean = false;
  message: string;
  shouldHideMessage: boolean = true;
  knowMoreTypeClass = KnowMoreLinkType;

  constructor(public askQuestionService: AskQuestionService,
    private renderer: Renderer2,
    private loginService: LoginService,
    private snackBarService: SnackBarService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.questionParentType === QuestionParentType.feedPage) {
      this.shouldHideMessage = false;
    }
    if (!this.showUserHeader) {
      if (this.question?.communityDTO) {
        this.showUserHeader = false;
      } else {
        this.showUserHeader = true;
      }
    }
    this.totalAnswered = this.question.pollQuestionMeta.totalAnswered;
    if (this.question.pollQuestionMeta.pollAnswer) {
      this.isResponded = true;
      this.progressIndicator(this.question.pollQuestionMeta);
    }
    if (this.loginService.isThisLoggedInUser(this.question.userDTO.userId)) {
      if (!this.isResponded)
        this.progressIndicator(this.question.pollQuestionMeta);
      this.isOwner = true;
    }
    // console.log("question", this.question)
  }

  respondToQuestion(postId, pollAnswer) {
    if (!this.loginService.loggedIn()) {
      return this.respondingActionEvetnt.emit({ signInRequiredError: true });
    }
    if (this.isOwner) {
      return this.openSnackBar(Message.PPA101);
    }
    if (postId != null && !this.question.pollQuestionMeta.pollAnswer) {
      this.loading = true;
      this.askQuestionService.respondToQuestion(postId, pollAnswer).subscribe((pollQuestionMeta: PollQuestionMeta) => {
        this.totalAnswered = pollQuestionMeta.totalAnswered;
        this.progressIndicator(pollQuestionMeta);
      }, (error: HttpErrorResponse) => {
        if (error?.error?.errorMessage) {
          this.openSnackBar(error?.error?.errorMessage);
        } else if (typeof error.error === "string") {
          this.openSnackBar(error?.error);
        }
      });
    }
  }

  removePost($event) {
    this.removePostEvent.emit($event);
  }

  progressIndicator(pollQuestionMeta: PollQuestionMeta) {
    this.loading = false;
    this.isResponded = true;
    this.agreePercentage = Math.round(pollQuestionMeta.agreePercentage) + '%';
    this.disagreePercentage = Math.round(pollQuestionMeta.disagreePercentage) + '%';
    this.renderer.setStyle(this.agree.nativeElement, 'width', pollQuestionMeta.agreePercentage + '%');
    this.renderer.setStyle(this.disagree.nativeElement, 'width', pollQuestionMeta.disagreePercentage + '%');
    if (pollQuestionMeta.agreePercentage > pollQuestionMeta.disagreePercentage) {
      this.renderer.setStyle(this.disagree.nativeElement, 'background', 'linear-gradient(to right, red, #ff000078)');
      this.renderer.setStyle(this.agree.nativeElement, 'background', 'linear-gradient(to right, green, #82b77685)');
      // this.renderer.setStyle(this.respondedDisagree.nativeElement, 'background', 'linear-gradient(to right, red, #ff000078)');
      // this.renderer.setStyle(this.respondedAgree.nativeElement, 'background', 'linear-gradient(to right, green, #82b77685)');
    } else if (pollQuestionMeta.disagreePercentage > pollQuestionMeta.agreePercentage) {
      // this.renderer.setStyle(this.respondedAgree.nativeElement, 'background', 'linear-gradient(to right, green, #82b77685)');
      // this.renderer.setStyle(this.respondedDisagree.nativeElement, 'background', 'linear-gradient(to right, red, #ff000078)');
      this.renderer.setStyle(this.agree.nativeElement, 'background', 'linear-gradient(to right, green, #82b77685)');
      this.renderer.setStyle(this.disagree.nativeElement, 'background', 'linear-gradient(to right, red, #ff000078)');
    } else {
      // this.renderer.setStyle(this.respondedAgree.nativeElement, 'background', 'linear-gradient(to right, green, #82b77685)');
      // this.renderer.setStyle(this.respondedDisagree.nativeElement, 'background', 'linear-gradient(to right, green, #82b77685)');
      this.renderer.setStyle(this.agree.nativeElement, 'background', 'linear-gradient(to right, green, #82b77685)');
      this.renderer.setStyle(this.disagree.nativeElement, 'background', 'linear-gradient(to right, green, #82b77685)');
    }
  }

  openSnackBar(errorMessage: string) {
    const onAction = () => {
      this.router.navigate(['/',
        GlobalConstants.helpPath,
        GlobalConstants.questnrPath,
        KnowMoreLinkType.postPollQuestion
      ]);
    }
    this.snackBarService.showSnackBar({
      message: errorMessage,
      duration: 5000,
      actionType: ActionType.learnMore,
      onAction: onAction
    });
  }

  getMessage() {
    if (this.loading) return;
    if (!this.isOwner) {
      return "Post owner can not see your answer!";
    }
    if (this.isOwner) {
      return "You can not answer your question!";
    }
  }

  shouldShowMessage(): boolean {
    return !this.shouldHideMessage
      && !this.loading
      && !this.isOwner
      && !this.isResponded;
  }

  handleHideNotResponded($event) {
    $event.preventDefault();
    this.shouldHideMessage = true;
  }
}
