import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-ribbon',
  templateUrl: './profile-ribbon.component.html',
  styleUrls: ['./profile-ribbon.component.scss']
})
export class ProfileRibbonComponent implements OnInit {
  public user_name:string ="Satish Kumar Gaur";
  public user_profile:string = "Software Developer @ Neostencil";
  constructor() { }

  ngOnInit() {
  }

}
