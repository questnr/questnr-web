import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { LoginService } from 'auth/login.service';
import { PollQuestionMeta, Post } from '../models/post-action.model';
import { AskQuestionService } from '../shared/components/dialogs/ask-question/ask-question.service';
import { GlobalConstants } from '../shared/constants';

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
  userPath = GlobalConstants.userPath;
  agreePercentage: string;
  disagreePercentage: string;
  isResponded = false;
  totalAnswered: number = 0;
  showUserHeader: boolean = true;

  constructor(public askQuestionService: AskQuestionService,
    private renderer: Renderer2,
    private loginService: LoginService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
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
    } else if (this.loginService.isThisLoggedInUser(this.question.userDTO.userId)) {
      this.progressIndicator(this.question.pollQuestionMeta);
    }
    // console.log("question", this.question)
  }

  respondToQuestion(postId, pollAnswer) {
    if (postId != null && !this.question.pollQuestionMeta.pollAnswer) {
      this.askQuestionService.respondToQuestion(postId, pollAnswer).subscribe((pollQuestionMeta: PollQuestionMeta) => {
        this.totalAnswered = pollQuestionMeta.totalAnswered;
        this.progressIndicator(pollQuestionMeta);
      });
    }
  }

  removePost($event) {
    this.removePostEvent.emit($event);
  }

  progressIndicator(pollQuestionMeta: PollQuestionMeta) {
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

}
