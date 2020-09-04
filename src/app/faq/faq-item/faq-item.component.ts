import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'faq-item',
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqItemComponent implements OnInit {
  @Input() title: string = "TITLE";
  constructor() { }

  ngOnInit(): void {
  }

}
