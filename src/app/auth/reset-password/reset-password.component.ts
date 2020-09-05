import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomValidations } from '../../custom-validations';
import { GlobalConstants } from '../../shared/constants';
import { ResetPasswordService } from './reset-password.service';

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
  resetToken: string;

  constructor(public fb: FormBuilder,
    private resetPasswordService: ResetPasswordService,
    private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.queryParams.subscribe(
      params => {
        this.resetToken = params['token'];
      });
  }

  ngOnInit(): void {
    this.group = this.fb.group({
      password: this.newPassword,
      confirmPassword: this.confirmPassword,
    }, { validators: CustomValidations.MatchPassword });
  }

  resetPassword() {
    if (this.group.valid) {
      this.isLoading = true;
      this.resetPasswordService.updatePassword(this.resetToken, this.group.get("password").value).subscribe((res: any) => {
        if (res?.updateSuccess) {
          this.successMsg = 'Password Reset successfully. Please <a href="' + this.loginLink + '"><strong style="cursor: pointer">Login</strong></a>';
        } else {
          this.errMsg = "Something went wrong, Please try again!";
        }
      });
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    }
  }
}
