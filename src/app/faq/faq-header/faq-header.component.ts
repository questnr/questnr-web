import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-faq-header',
  templateUrl: './faq-header.component.html',
  styleUrls: ['./faq-header.component.scss']
})
export class FaqHeaderComponent implements OnInit, AfterViewInit {
  @Input() queryString: string;
  @Input() category: string;
  mobileView: boolean = false;

  constructor(private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

  ngAfterViewInit(): void {

  }

  setCategory(category: string) {
    this.category = category;
  }
}
