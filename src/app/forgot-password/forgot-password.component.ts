import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GlobalConstants} from '../shared/constants';

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
  constructor(public fb: FormBuilder) { }
  ngOnInit(): void {
    this.group = this.fb.group({
      communityName: this.email
    });
  }
  sendResetLink() {
    if(this.group.valid){
      this.isLoading = true;
      setTimeout( () => {
        this.isLoading = false;
        this.successMsg = 'Please check your email address for password reset link.';
      }, 1000);
    }
  }
}
