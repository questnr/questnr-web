import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from '../shared/constants';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  home = GlobalConstants.feedPath;
  constructor() { }

  ngOnInit(): void {
  }

}
