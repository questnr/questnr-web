import { Component, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'auth/login.service';
import { GlobalConstants } from '../shared/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() btnClick = new EventEmitter<any>();
  feedPath: string = GlobalConstants.feedPath;
  constructor(public loginService: LoginService) { }

  activeAuthEvent($event) {
    // Uncomment below line to scroll to respective form component
    // this.btnClick.emit($event);
  }
}
