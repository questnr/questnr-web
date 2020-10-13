import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'global.service';
import { UserQuestionListModalType } from 'models/user-question.model';

@Component({
  selector: 'app-no-user-question',
  templateUrl: './no-user-question.component.html',
  styleUrls: ['./no-user-question.component.scss']
})
export class NoUserQuestionComponent implements OnInit {
  @Input() isOwner: boolean = false;
  @Input() notAllowed: boolean = false;
  @Input() type: UserQuestionListModalType = UserQuestionListModalType.user;
  userQuestionListModalTypeClass = UserQuestionListModalType;
  mobileView: boolean = false;

  constructor(private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

}
