import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from '../shared/constants';

@Component({
  selector: 'app-quick-nav',
  templateUrl: './quick-nav.component.html',
  styleUrls: ['./quick-nav.component.scss']
})
export class QuickNavComponent implements OnInit {

  constructor() { }
  home = GlobalConstants.feedPath;
  explore = GlobalConstants.explorePath;

  ngOnInit(): void {
  }
  goToLink(slug) {
    window.open(slug, '_self');
  }
}
