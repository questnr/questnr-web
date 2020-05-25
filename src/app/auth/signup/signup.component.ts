import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { LoginService } from 'auth/login.service';
import { AsyncValidator, CustomValidations } from '../../custom-validations';
import { GlobalConstants, REGEX } from '../../shared/constants';

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
  email = new FormControl('',
    {
      validators: [Validators.required, Validators.pattern(REGEX.EMAIL)],
      asyncValidators: [AsyncValidator.checkEmailExists(this.auth)]
    });
  username = new FormControl('',
    {
      validators: [
        Validators.required,
        Validators.pattern(/^[_A-z0-9]*$/),
        Validators.minLength(3),
        Validators.maxLength(32),
      ],
      asyncValidators: [AsyncValidator.checkUsernameExists(this.auth)]
    });
  password = new FormControl('',
    [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100)
    ]);
  confirmPassword = new FormControl('', Validators.required);
  accept = new FormControl('', Validators.requiredTrue);
  dob = new FormControl('', Validators.required);
  today = new Date();
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
      dob: this.dob,
      accept: this.accept
    }, { validators: CustomValidations.MatchPassword });
  }

  submit() {
    if (this.group.valid) {
      this.isLoading = true;
      const obj = { ...this.group.value, dob: new Date(this.dob.value).getTime() };
      this.auth.signUp(obj).subscribe(
        res => {
          if (res.loginSuccess) {
            localStorage.setItem('token', res.accessToken);
            this.router.navigate(["/", GlobalConstants.feedPath]);
          } else {
            this.errMsg = res.errorMessage;
          }
          this.isLoading = false;
        }, err => { this.isLoading = false; }
      );
    } else {
      this.group.markAllAsTouched();
    }
  }

  googleLogin() {
    this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      const obj = { idToken: user.idToken, source: 'WEB' };
      this.auth.loginWithGoogle(obj).subscribe(
        (res: any) => {
          if (res.loginSuccess) {
            localStorage.setItem('token', res.accessToken);
            this.router.navigate(["/", GlobalConstants.feedPath]);
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
          this.router.navigate(["/", GlobalConstants.feedPath]);
        } else if (typeof res.errorMessage === "string") {
          this.formError = res.errorMessage;
        } else if (typeof res.errors === "object" && res.errors.length > 0) {
          this.formError = res.errors[0].defaultMessage;
        }
      }, err => { }
    );
  }
}
