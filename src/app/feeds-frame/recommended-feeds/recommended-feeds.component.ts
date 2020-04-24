import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recommended-feeds',
  templateUrl: './recommended-feeds.component.html',
  styleUrls: ['./recommended-feeds.component.scss']
})
export class RecommendedFeedsComponent implements OnInit {
  @Input() feed;

  constructor() { }

  ngOnInit() {
  }

}
