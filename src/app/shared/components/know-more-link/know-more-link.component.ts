import { Component, OnInit, Input } from '@angular/core';
import { KnowMoreLinkType } from 'models/know-more-type';

@Component({
  selector: 'know-more-link',
  templateUrl: './know-more-link.component.html',
  styleUrls: ['./know-more-link.component.scss']
})
export class KnowMoreLinkComponent implements OnInit {
  @Input() knowMoreType: KnowMoreLinkType;
  @Input() knowMoreText?: string = "know more";

  constructor() { }

  ngOnInit(): void {
  }

}
