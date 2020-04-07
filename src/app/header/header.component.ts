import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() btnClick = new EventEmitter<any>();
  public notification = 'notifications';
  public home = 'home';
  public group = 'supervisor_account';
  public message = 'chat';
  public account = 'account_circle';

  constructor(public loginService: LoginService, private router: Router) { }

  public changeIcon(newIcon: string, oldIcon: string) {
    if (oldIcon == 'notifications') {
      this.notification = newIcon;
    }
    if (oldIcon == 'supervisor_account') {
      this.group = newIcon;
    }
    if (oldIcon == 'chat') {
      this.message = newIcon;
    }
    if (oldIcon == 'account_circle') {
      this.account = newIcon;
    }
    if (oldIcon == 'home') {
      this.home = newIcon;
    }
  }
  ngOnInit() {

  }
  onClick(val) {
    this.btnClick.emit(val);
  }
  signOut() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
