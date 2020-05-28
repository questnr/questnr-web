import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidations} from '../custom-validations';
import {GlobalConstants} from '../shared/constants';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss', '../forgot-password/forgot-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  errMsg = '';
  successMsg = '';
  isLoading = false;
  loginLink = '/' + GlobalConstants.login + '/';
  group: FormGroup;
  currentPassword = new FormControl('',
    [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)
    ]);
  newPassword = new FormControl('',
    [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)
    ]);
  confirmPassword = new FormControl('',
    [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)
    ]);

  constructor(public fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.group = this.fb.group({
      password: this.newPassword,
      confirmPassword: this.confirmPassword,
    }, { validators: CustomValidations.MatchPassword });
  }

  resetPassword() {
    if(this.group.valid){
      this.isLoading = true;
      setTimeout( () => {
        this.isLoading = false;
        this.successMsg = 'Password Reset successfully. Please <a href="' + this.loginLink + '"><strong style="cursor: pointer">Login</strong></a>';
      }, 1000);
    }
  }
}
