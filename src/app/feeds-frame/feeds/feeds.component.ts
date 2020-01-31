import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {
  public user_name:string ="Satish Kumar Gaur";
  public user_profile:string = "Software Developer @ Neostencil";
  constructor() { }

  ngOnInit() {
  }

}
