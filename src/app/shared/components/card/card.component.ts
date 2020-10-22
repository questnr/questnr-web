import { Component, OnInit, Input } from '@angular/core';
import { StaticMediaSrc } from '../../constants/static-media-src';

@Component({
  selector: 'qnr-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() imgSrc = StaticMediaSrc.communityFile;
  @Input() title;
  @Input() detail;
  @Input() slug;

  constructor() { }

  ngOnInit() {
  }

}
