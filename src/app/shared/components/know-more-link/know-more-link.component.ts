import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { KnowMoreLinkType } from 'models/know-more-type';
import { GlobalConstants } from 'shared/constants';

@Component({
  selector: 'know-more-link',
  templateUrl: './know-more-link.component.html',
  styleUrls: ['./know-more-link.component.scss']
})
export class KnowMoreLinkComponent implements OnInit {
  @Input() knowMoreId: KnowMoreLinkType;
  @Input() knowMoreText?: string = "Learn more";
  @Output() clickEvent = new EventEmitter();
  helpPath: string = GlobalConstants.helpPath;
  questnrPath: string = GlobalConstants.questnrPath;

  constructor() {
  }

  ngOnInit(): void {
  }

  handleClick($event) {
    $event.preventDefault();
    this.clickEvent.emit();
  }
}
