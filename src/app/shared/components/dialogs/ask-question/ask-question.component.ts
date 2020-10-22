import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from '../../../../global.service';
import { Post } from '../../../../models/post-action.model';
import { AskQuestionService } from './ask-question.service';
import set = Reflect.set;

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }],
  encapsulation: ViewEncapsulation.None
})
export class AskQuestionComponent implements OnInit {
  question: Post;
  answerForm: FormGroup;
  questionForm: FormGroup;
  isLinear = true;
  loader = false;
  agreeText = new FormControl('',
    [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25)
    ]);
  disagreeText = new FormControl('',
    [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25)
    ]);
  text = new FormControl('',
    [
      Validators.required,
      Validators.minLength(3)
    ]);
  mobileView: boolean = false;

  constructor(private fb: FormBuilder, public askQuestionService: AskQuestionService,
    public dialogRef: MatDialogRef<AskQuestionComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();

    this.answerForm = this.fb.group({
      agreeText: this.agreeText,
      disagreeText: this.disagreeText
    });
    this.questionForm = this.fb.group({
      text: this.text
    });
  }

  postQuestion() {
    this.loader = true;
    setTimeout(() => {
      const agreeText = this.answerForm.get('agreeText').value;
      const disagreeText = this.answerForm.get('disagreeText').value;
      const text = this.questionForm.get('text').value;
      const questionObj = {
        agreeText, disagreeText, text
      };
      if (this.data.isCommunityQuestion) {
        this.askQuestionService.postQuestionInCommunity(this.data.communityId, questionObj).subscribe((res: any) => {
          if (res) {
            this.question = res;
            this.loader = false;
            setTimeout(() => {
              this.closeDialog(res);
            }, 2000);
          }
        });
      }
      if (!this.data.isCommunityQuestion) {
        this.askQuestionService.postQuestion(questionObj).subscribe((res: Post) => {
          if (res) {
            this.question = res;
            this.loader = false;
            setTimeout(() => {
              this.closeDialog(res);
            }, 2000);
          }
        });
      }
    }, 2000);
  }

  closeDialog(data): void {
    this.dialogRef.close({ data });
  }
}
