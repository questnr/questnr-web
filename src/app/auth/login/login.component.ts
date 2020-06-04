import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { AuthService, LoginOpt } from 'angularx-social-login';
import { ApiService } from '../../shared/api.service';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { GlobalConstants } from 'shared/constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  group: FormGroup;
  errMsg: '';
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  forgotPassword = GlobalConstants.forgotPassword;

  constructor(
    private fb: FormBuilder, private auth: LoginService,
    private router: Router, private socialAuth: AuthService,
    private angularFireMessaging: AngularFireMessaging, private apiService: ApiService) { }

  ngOnInit() {
    this.group = this.fb.group({
      emailId: this.email,
      password: this.password
    });
  }

  login() {
    this.errMsg = '';
    if (this.group.valid) {
      this.isLoading = true;
      this.auth.login(this.group.value).subscribe(
        res => {
          if (res.accessToken && res.loginSuccess) {
            localStorage.setItem('token', res.accessToken);
            // register token for this user
            this.angularFireMessaging.getToken.subscribe(token => {
              this.apiService.registerPushNotificationToken(token).subscribe();
            });
            this.router.navigate(["/", GlobalConstants.feedPath]);
          } else {
            this.errMsg = res.errorMessage;
          }
          this.isLoading = false;
        },
        err => { this.isLoading = false; }
      );
    }
  }

  googleLogin() {
    this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      console.log("user", user);
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
    const fbLoginOptions: LoginOpt = {
      scope: 'email, birthday, first_name, last_name',
      return_scopes: true
    };
    this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID, fbLoginOptions).then(user => {
      console.log("user", user);
      const obj = { authToken: user.authToken, source: "WEB" };
      this.auth.loginWithFacebook(obj).subscribe(
        (res: any) => {
          if (res.loginSuccess) {
            localStorage.setItem('token', res.accessToken);
            this.router.navigate(["/", GlobalConstants.feedPath]);
          }
        }, err => { }
      );
    });
  }
  // socialLogin(user) {
  //   this.auth.login(user).subscribe(
  //     res => {
  //       if (res.loginSuccess) {
  //         localStorage.setItem('token', res.accessToken);
  //         this.router.navigate(["/", GlobalConstants.feedPath]);
  //       }
  //     }, err => { }
  //   );
  // }
}
