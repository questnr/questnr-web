import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-ribbon',
  templateUrl: './profile-ribbon.component.html',
  styleUrls: ['./profile-ribbon.component.scss']
})
export class ProfileRibbonComponent implements OnInit {
  public user_name = 'Andrew Garfield';
  public user_profile = 'Software Developer @ Macintosh';
  constructor() { }

  ngOnInit() {
  }

}
