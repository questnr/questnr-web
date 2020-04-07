import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-ribbon',
  templateUrl: './profile-ribbon.component.html',
  styleUrls: ['./profile-ribbon.component.scss']
})
export class ProfileRibbonComponent implements OnInit {
  @Input() user;
  @Input() profile;

  constructor() { }

  ngOnInit() {
  }

}
