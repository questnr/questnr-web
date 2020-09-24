import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'global.service';
import { Post } from 'models/post-action.model';
import { GlobalConstants } from 'shared/constants';

@Component({
  selector: 'app-user-question',
  templateUrl: './user-question.component.html',
  styleUrls: ['./user-question.component.scss']
})
export class UserQuestionComponent implements OnInit, AfterViewInit {
  @Input() question: Post;
  questionPath: string = GlobalConstants.postQuestionPath;
  mobileView: boolean = false;

  constructor(private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

  ngAfterViewInit(): void {
  }

}
