import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-more-button',
  templateUrl: './view-more-button.component.html',
  styleUrls: ['./view-more-button.component.scss']
})
export class ViewMoreButtonComponent implements OnInit {
  @Input() text: string = "View more";

  constructor() { }

  ngOnInit(): void {
  }

}
