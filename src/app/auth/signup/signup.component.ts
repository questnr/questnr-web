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
  formError: string = "";
  firstName = new FormControl('',
    [
      Validators.required,
      Validators.pattern(/^[\S]*$/),
      Validators.minLength(3),
      Validators.maxLength(25)
    ]);
  lastName = new FormControl('',
    [
      Validators.required,
      Validators.pattern(/^[\S]*$/),
      Validators.minLength(3),
      Validators.maxLength(25)
    ]);
  email = new FormControl('', [Validators.required, Validators.pattern(REGEX.EMAIL)]);
  username = new FormControl('',
    [
      Validators.required,
      Validators.pattern(/^[_A-z0-9]*$/),
      Validators.minLength(3),
      Validators.maxLength(32)
    ]);
  password = new FormControl('',
    [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100)
    ]);
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
        this.formError = "";
        if (res.loginSuccess) {
          localStorage.setItem('token', res.accessToken);
          this.router.navigate(['feeds']);
        } else if (typeof res.errors == "object" && res.errors.length > 0) {
          this.formError = res.errors[0].defaultMessage;
        }
      }, err => { }
    );
  }
}
