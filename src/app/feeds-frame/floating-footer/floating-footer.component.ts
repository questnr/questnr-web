import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'shared/constants';

@Component({
  selector: 'app-floating-footer',
  templateUrl: './floating-footer.component.html',
  styleUrls: ['./floating-footer.component.scss']
})
export class FloatingFooterComponent implements OnInit {
  footerLinks = [
    { link: '/' + GlobalConstants.feedPath, title: 'Home' },
    { link: '/' + GlobalConstants.termsPath, title: 'Terms' },
    { link: '/' + GlobalConstants.policyPath, title: 'Privacy Policy' },
  ];
  constructor() { }

  ngOnInit() {
  }

}
