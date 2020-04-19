import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { REGEX } from 'shared/constants';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  group: FormGroup;
  errMsg: '';
  email = new FormControl('', [Validators.required, Validators.pattern(REGEX.EMAIL)]);
  password = new FormControl('', Validators.required);

  constructor(
    private fb: FormBuilder, private auth: LoginService,
    private router: Router, private socialAuth: AuthService) { }

  ngOnInit() {
    this.group = this.fb.group({
      emailId: this.email,
      password: this.password
    });
  }

  login() {
    this.errMsg = '';
    if (this.group.valid) {
      this.auth.login(this.group.value).subscribe(
        res => {
          if (res.loginSuccess) {
            console.log('Im IN');
            localStorage.setItem('token', res.accessToken);
            this.router.navigate(['feeds']);
          } else {
            this.errMsg = res.errorMessage;
          }
        },
        err => { }
      );
    }
  }

  googleLogin() {
    this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      console.log(user);
      this.socialLogin(user);
    });
  }

  facebookLogin() {
    this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
      this.socialLogin(user);
    });
  }
  socialLogin(user) {
    this.auth.login(user).subscribe(
      res => {
        if (res.loginSucces) {
          this.router.navigate(['feeds']);
        }
      }, err => { }
    );
  }
}
