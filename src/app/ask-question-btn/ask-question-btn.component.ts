import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AskQuestionComponent} from '../shared/components/dialogs/ask-question/ask-question.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-ask-question-btn',
  templateUrl: './ask-question-btn.component.html',
  styleUrls: ['./ask-question-btn.component.scss']
})
export class AskQuestionBtnComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  @Input() type: any;
  @Input() isCommunityQuestion: any;
  @Input() communityId: number;
  @Output() questionData = new EventEmitter();
  ngOnInit(): void {
  }
  askQuestion(): void {
    const dialogRef = this.dialog.open(AskQuestionComponent, {
      width: '800px',
      data: { isCommunityQuestion : this.isCommunityQuestion, communityId: this.communityId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.questionData.emit(result);
    });
  }
}
