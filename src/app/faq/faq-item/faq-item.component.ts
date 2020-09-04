import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { GlobalService } from 'global.service';

@Component({
  selector: 'faq-item',
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqItemComponent implements OnInit {
  @Input() title: string = "TITLE";
  mobileView: boolean = false;
  constructor(private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

}
