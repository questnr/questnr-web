import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { REGEX } from '../../shared/constants';
import { CustomValidations } from '../../custom-validations';
import { LoginService } from 'auth/login.service';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class SignupComponent implements OnInit {
  errMsg: '';
  isLoading = false;
  group: FormGroup;
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.pattern(REGEX.EMAIL)]);
  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  confirmPassword = new FormControl('', Validators.required);

  constructor(
    private fb: FormBuilder, private auth: LoginService,
    private socialAuth: AuthService, private router: Router) { }

  ngOnInit() {
    this.group = this.fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      emailId: this.email,
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,
    }, { validators: CustomValidations.MatchPassword });
  }

  submit() {
    if (this.group.valid) {
      this.isLoading = true;
      this.auth.signUp(this.group.value).subscribe(
        res => {
          if (res.loginSuccess) {
            localStorage.setItem('token', res.accessToken);
            this.router.navigate(['feeds']);
          } else {
            this.errMsg = res.errorMessage;
          }
          this.isLoading = false;
        }, err => { this.isLoading = false; }
      );
    }
  }

  googleLogin() {
    this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      const obj = { idToken: user.idToken, source: 'WEB' };
      this.auth.loginWithGoogle(obj).subscribe(
        (res: any) => {
          if (res.loginSuccess) {
            localStorage.setItem('token', res.accessToken);
            this.router.navigate(['feeds']);
          }
        }, err => { }
      );
    });
  }

  facebookLogin() {
    this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
      this.signUp(user);
    });
  }
  signUp(user) {
    this.auth.signUp(user).subscribe(
      res => {
        if (res.loginSuccess) {
          localStorage.setItem('token', res.accessToken);
          this.router.navigate(['feeds']);
        }
      }, err => { }
    );
  }
}
