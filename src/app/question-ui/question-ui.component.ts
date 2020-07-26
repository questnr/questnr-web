import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Post } from '../models/post-action.model';
import { AskQuestionService } from '../shared/components/dialogs/ask-question/ask-question.service';
import { GlobalConstants } from '../shared/constants';

@Component({
  selector: 'app-question-ui',
  templateUrl: './question-ui.component.html',
  styleUrls: ['./question-ui.component.scss']
})
export class QuestionUIComponent implements OnInit {

  constructor(public askQuestionService: AskQuestionService, public renderer: Renderer2) {
  }

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

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.totalAnswered = this.question.pollQuestionMeta.totalAnswered;
    if (this.question.pollQuestionMeta.pollAnswer) {
      this.isResponded = true;
      this.progressIndicator(this.question.pollQuestion);
    }
    console.log("question", this.question)
  }

  respondToQuestion(postId, pollAnswer) {
    if (postId != null && !this.question.pollQuestionMeta.pollAnswer) {
      this.askQuestionService.respondToQuestion(postId, pollAnswer).subscribe((res: any) => {
        // console.log(res);
        this.totalAnswered++;
        this.progressIndicator(res);
      });
    }
  }

  removePost($event) {
    this.removePostEvent.emit($event);
  }

  progressIndicator(res) {
    this.agreePercentage = Math.round(res.agreePercentage) + '%';
    this.disagreePercentage = Math.round(res.disagreePercentage) + '%';
    this.renderer.setStyle(this.agree.nativeElement, 'width', res.agreePercentage + '%');
    this.renderer.setStyle(this.disagree.nativeElement, 'width', res.disagreePercentage + '%');
    if (res.agreePercentage > res.disagreePercentage) {
      this.renderer.setStyle(this.disagree.nativeElement, 'background', 'linear-gradient(to right, red, #ff000078)');
      this.renderer.setStyle(this.agree.nativeElement, 'background', 'linear-gradient(to right, green, #82b77685)');
      // this.renderer.setStyle(this.respondedDisagree.nativeElement, 'background', 'linear-gradient(to right, red, #ff000078)');
      // this.renderer.setStyle(this.respondedAgree.nativeElement, 'background', 'linear-gradient(to right, green, #82b77685)');
    } else if (res.disagreePercentage > res.agreePercentage) {
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
