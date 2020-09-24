import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'global.service';

@Component({
  selector: 'app-no-user-question',
  templateUrl: './no-user-question.component.html',
  styleUrls: ['./no-user-question.component.scss']
})
export class NoUserQuestionComponent implements OnInit {
  @Input() isOwner: boolean = false;
  mobileView: boolean = false;

  constructor(private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

}
