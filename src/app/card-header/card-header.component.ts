import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { GlobalService } from '../global.service';
import { CardHeaderType } from '../models/card-header.model';

@Component({
  selector: 'app-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardHeaderComponent implements OnInit, AfterViewInit {
  @Input() title: string;
  @Input() count: number;
  @Input() showArrow: boolean = false;
  @Output() arrowClickEmitter = new EventEmitter();
  @Input() type: CardHeaderType = CardHeaderType.community;
  cardHeaderTypeClass = CardHeaderType;
  mobileView: boolean = false;

  constructor(private _globalService: GlobalService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

  setCount(count: number): void {
    this.count = count;
  }
  setShouldArrow(showArrow: boolean): void {
    this.showArrow = showArrow;
  }

  arrowClick(): void {
    this.arrowClickEmitter.emit();
  }
}
