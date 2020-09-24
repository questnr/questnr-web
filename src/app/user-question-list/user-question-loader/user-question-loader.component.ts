import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobalService } from 'global.service';

@Component({
  selector: 'app-user-question-loader',
  templateUrl: './user-question-loader.component.html',
  styleUrls: ['./user-question-loader.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserQuestionLoaderComponent implements OnInit {
  @Input() rows: number = 5;
  listItems;
  mobileView: boolean = false;
  lineTheme: any = {};
  circleTheme: any = {};

  constructor(private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
    if (this.mobileView) {
      this.lineTheme = { height: '18px' };
      this.circleTheme = { width: '23px', height: '23px' };
    } else {
      this.lineTheme = { height: '15px' };
      this.circleTheme = { width: '20px', height: '20px' };
    }
  }

  ngAfterViewInit(): void {
    this.setListItems(this.rows ? this.rows : 5);
  }

  setListItems(rows: number) {
    this.rows = rows;
    this.listItems = Array(this.rows);
  }
}
