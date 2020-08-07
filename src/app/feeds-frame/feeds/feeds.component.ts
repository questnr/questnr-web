import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {
  @Input() mobileView: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
