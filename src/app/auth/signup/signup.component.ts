import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'auth/login.service';
import { CommonService } from 'common/common.service';
import { LoginResponse, LoginSignUpComponentType } from 'models/login.model';
import { GlobalConstants, REGEX } from 'shared/constants';
import { UIService } from 'ui/ui.service';
import { AsyncValidator } from '../../custom-validations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
  @Input() publicEntityId: number;
  errMsg: string = '';
  isLoading = false;
  group: FormGroup;
  formError = '';
  termsPath = GlobalConstants.termsPath;
  policyPath = GlobalConstants.policyPath;
  hasEmailVerified: boolean = false;
  otp: string;
  @Output() closeModal = new EventEmitter();
  @Input() componentType: LoginSignUpComponentType = LoginSignUpComponentType.page;
  // firstName = new FormControl('',
  //   [
  //     Validators.required,
  //     Validators.pattern(/^[\S]*$/),
  //     Validators.minLength(3),
  //     Validators.maxLength(25)
  //   ]);
  // lastName = new FormControl('',
  //   [
  //     Validators.required,
  //     Validators.pattern(/^[\S]*$/),
  //     Validators.minLength(3),
  //     Validators.maxLength(25)
  //   ]);
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
  // dob = new FormControl('', Validators.required);
  maxAllowedDOB = new Date(new Date().setFullYear(new Date().getFullYear() - GlobalConstants.signUpAgeRestriction));
  constructor(
    private uiService: UIService,
    private fb: FormBuilder, private auth: LoginService, private dialog: MatDialog,
    private router: Router, private commonService: CommonService) {
    if (this.router.routerState.snapshot.url == ['/', GlobalConstants.signUp].join("")) {
      this.uiService.setTitle(GlobalConstants.signupTitle);
    }
  }

  ngOnInit() {
    this.group = this.fb.group({
      // firstName: this.firstName,
      // lastName: this.lastName,
      emailId: this.email,
      username: this.username,
      password: this.password,
      // confirmPassword: this.confirmPassword,
      // dob: this.dob
    }, {
      // validators: CustomValidations.MatchPassword
    });
  }

  ngOnDestroy() {
    this.uiService.resetTitle();
  }

  submit() {
    // this.openWelcomeDialog();
    this.formError = "";
    if (this.group.valid) {
      if (this.hasEmailVerified) {
        this.isLoading = true;
        // const obj = { ...this.group.value, dob: this.commonService.getDateFromNumber(this.group.get("dob").value), otp: this.otp };
        let obj = { ...this.group.value, otp: this.otp };
        if (typeof this.publicEntityId != 'undefined' && this.publicEntityId) {
          obj["publicEntityId"] = this.publicEntityId;
        }
        this.auth.signUp(obj).subscribe(
          (res: LoginResponse) => {
            if (res.loginSuccess) {
              this.signUpSuccess(res);
            } else {
              this.errMsg = res.errorMessage;
            }
            this.isLoading = false;
          }, err => { this.isLoading = false; }
        );
      } else {
        this.formError = "Email has not been verified";
      }
    } else {
      this.group.markAllAsTouched();
    }
  }
  openWelcomeDialog() {
    // this.dialog.open(WelcomeSlidesComponent, { width: '500px', });
  }

  googleLogin() {
  }

  facebookLogin() {
  }

  signUp(user) {
    this.auth.signUp(user).subscribe(
      (res: LoginResponse) => {
        this.formError = '';
        if (res.loginSuccess) {
          this.signUpSuccess(res);
        } else if (typeof res.errorMessage === 'string') {
          this.formError = res.errorMessage;
        }
        //  else if (typeof res.errors === 'object' && res.errors.length > 0) {
        //   this.formError = res.errors[0].defaultMessage;
        // }
      }, err => { }
    );

  }

  signUpSuccess(res: LoginResponse) {
    localStorage.setItem('token', res.accessToken);
    // If component has been opened in a modal
    if (typeof this.publicEntityId != 'undefined' && this.publicEntityId
      && this.componentType == LoginSignUpComponentType.modal) {
      this.closeModal.emit();
    } else {
      // show community suggestion box if communitySuggestion is true
      this.router.navigate(['/', GlobalConstants.feedPath], { state: { communitySuggestion: res.communitySuggestion ? true : false } });
      // this.openWelcomeDialog();
    }
  }

  emailHasBeenVerified(event) {
    this.hasEmailVerified = event.hasVerified;
    this.otp = event.otp;
  }
}
