import { Component, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'auth/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() btnClick = new EventEmitter<any>();

  constructor(public loginService: LoginService) { }

  onClick(val) {
    this.btnClick.emit(val);
  }
}
