import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { LoginResponse, LoginSignUpComponentType } from 'models/login.model';
import { GlobalConstants } from 'shared/constants';
import { UIService } from 'ui/ui.service';
import { ApiService } from '../../shared/api.service';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  isLoading = false;
  url = GlobalConstants;
  group: FormGroup;
  errMsg: string = '';
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  forgotPassword = GlobalConstants.forgotPassword;
  redirectURL: any;
  @Output() closeModal = new EventEmitter();
  @Input() componentType: LoginSignUpComponentType = LoginSignUpComponentType.page;

  constructor(
    private uiService: UIService,
    private fb: FormBuilder, private auth: LoginService,
    private router: Router, private socialAuth: AuthService, private route: ActivatedRoute,
    private angularFireMessaging: AngularFireMessaging, private apiService: ApiService) {
    if (this.router.routerState.snapshot.url == ['/', GlobalConstants.login].join("")) {
      this.uiService.setTitle(GlobalConstants.loginTitle);
    }
  }

  ngOnInit() {
    this.group = this.fb.group({
      emailId: this.email,
      password: this.password
    });
    // @todo: Do this for Google users as well
    this.socialAuth.authState.subscribe((user: SocialUser) => {
      if (user != null && user.authToken) {
        const obj = { authToken: user.authToken, source: "WEB" };
        this.auth.loginWithFacebook(obj).subscribe(
          (res: LoginResponse) => {
            if (res.accessToken && res.loginSuccess) {
              localStorage.setItem('token', res.accessToken);
              this.loginThread(res);
            }
          }, err => { }
        );
      }
    });
  }

  ngOnDestroy() {
    this.uiService.resetTitle();
  }

  login() {
    this.errMsg = '';
    if (this.group.valid) {
      this.isLoading = true;
      this.auth.login(this.group.value).subscribe(
        (res: LoginResponse) => {
          if (res.accessToken && res.loginSuccess) {
            localStorage.setItem('token', res.accessToken);
            // register token for this user
            this.angularFireMessaging.getToken.subscribe(token => {
              this.apiService.registerPushNotificationToken(token).subscribe();
            });
            const params = this.route.snapshot.queryParams;
            if (params.redirectURL) {
              this.redirectURL = params.redirectURL;
            }
            if (this.redirectURL) {
              this.router.navigateByUrl(this.redirectURL)
                .catch(() => this.loginThread(res));
            } else {
              this.loginThread(res);
            }
            // this.router.navigate(["/", GlobalConstants.feedPath]);
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
      // console.log("user", user);
      const obj = { idToken: user.idToken, source: 'WEB' };
      this.auth.loginWithGoogle(obj).subscribe(
        (res: LoginResponse) => {
          if (res.accessToken && res.loginSuccess) {
            localStorage.setItem('token', res.accessToken);
            this.loginThread(res);
          }
        }, err => { }
      );
    });
  }

  facebookLogin() {
    this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID, { scope: "email" }).then(user => {
      const obj = { authToken: user.authToken, source: "WEB" };
      this.auth.loginWithFacebook(obj).subscribe(
        (res: LoginResponse) => {
          if (res.accessToken && res.loginSuccess) {
            localStorage.setItem('token', res.accessToken);
            this.loginThread(res);
          }
        }, err => { }
      );
    });
  }

  loginThread(res: LoginResponse) {
    // If component has been opened in a modal
    if (this.closeModal && this.componentType == LoginSignUpComponentType.modal) {
      this.closeModal.emit();
    } else {
      // show community suggestion box if communitySuggestion is true
      this.router.navigate(["/", GlobalConstants.feedPath],
        { state: { communitySuggestion: res.communitySuggestion ? true : false } });
    }
  }

  handleForgetPassword($event) {
    $event.preventDefault();
    if (this.closeModal && this.componentType == LoginSignUpComponentType.modal) {
      this.closeModal.emit();
    }
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
