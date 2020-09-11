import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'global.service';

@Component({
  selector: 'faq-loader',
  templateUrl: './faq-loader.component.html',
  styleUrls: ['./faq-loader.component.scss']
})
export class FaqLoaderComponent implements OnInit {
  mobileView: boolean = false;
  @Input() showText: boolean = true;

  constructor(
    private _globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

}
