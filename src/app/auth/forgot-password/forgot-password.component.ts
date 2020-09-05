import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalConstants } from '../../shared/constants';
import { ForgotPasswordService } from './forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  global = GlobalConstants;
  group: FormGroup;
  successMsg = '';
  errMsg = '';
  email = new FormControl('', Validators.required);
  isLoading = false;
  constructor(public fb: FormBuilder, private forgotPasswordService: ForgotPasswordService) { }
  ngOnInit(): void {
    this.group = this.fb.group({
      email: this.email
    });
  }
  sendResetLink() {
    if (this.group.valid) {
      this.isLoading = true;
      this.forgotPasswordService.sendResetLink(this.group.get("email").value).subscribe((res: any) => {
        this.isLoading = false;
        if (res?.success) {
          this.successMsg = 'Please check your email address for password reset link.';
        }
        else if (res?.errorMessage) {
          this.errMsg = res.errorMessage;
        }
      });
    }
  }
}
