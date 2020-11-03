import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading-page-mobile',
  templateUrl: './loading-page-mobile.component.html',
  styleUrls: ['./loading-page-mobile.component.scss']
})
export class LoadingPageMobileComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
}
