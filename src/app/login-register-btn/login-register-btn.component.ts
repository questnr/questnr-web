import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'shared/constants';

@Component({
  selector: 'app-login-register-btn',
  templateUrl: './login-register-btn.component.html',
  styleUrls: ['./login-register-btn.component.scss', '/src/app/header/header.component.scss']
})
export class LoginRegisterBtnComponent implements OnInit {
  @Output() activeAuthEmitter = new EventEmitter();
  @Input() openNewTab: boolean = false;
  loginPath: string = GlobalConstants.login;
  signUpPath: string = GlobalConstants.signUp;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  gotTo(val: string) {
    if (this.activeAuthEmitter && !this.openNewTab) {
      this.activeAuthEmitter.emit(val);
    } else if (this.openNewTab) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/', val])
      );

      window.open(url, '_blank');
    }
  }

}
