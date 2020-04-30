import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'qnr-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() imgSrc = 'assets/default.jpg';
  @Input() title;
  @Input() detail;
  @Input() slug;

  constructor() { }

  ngOnInit() {
  }

}
