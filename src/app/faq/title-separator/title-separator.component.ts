import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'global.service';

@Component({
  selector: 'title-separator',
  templateUrl: './title-separator.component.html',
  styleUrls: ['./title-separator.component.scss']
})
export class TitleSeparatorComponent implements OnInit {
  mobileView: boolean = false;

  constructor(private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

}
