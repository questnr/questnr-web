import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { OTPVerificationService } from './otp-verification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {
  @Input() email: string;
  hasOTPBeenSent: boolean = false;
  isSendingOTP: boolean = false;
  isResendingOTP: boolean = false;
  isVerifying: boolean = false;
  @Output() emailHasBeenVerifiedEvent = new EventEmitter();
  otp = new FormControl('',
    [
      Validators.required
    ]);

  constructor(private otpVerificationService: OTPVerificationService, public snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  sendOTP(event) {
    event.preventDefault();
    this.isSendingOTP = true;
    this.hasOTPBeenSent = false;
    this.otpVerificationService.sendOTP(this.email).subscribe((res: any) => {
      this.snackbar.open('OTP has been sent successfully', 'close', { duration: 5000 });
      this.isSendingOTP = false;
      this.hasOTPBeenSent = true;
    }, (err: any) => {
      this.isSendingOTP = false;
      if (err?.error?.errorMessage)
        this.snackbar.open(err.error.errorMessage, 'close', { duration: 5000 });
      else
        this.snackbar.open('something went wrong.', 'close', { duration: 5000 });
    });
  }

  resendOTP(event) {
    event.preventDefault();
    this.isResendingOTP = true;
    this.otpVerificationService.resendOTP(this.email).subscribe((res: any) => {
      this.isResendingOTP = false;
      this.snackbar.open('OTP has been sent again successfully', 'close', { duration: 5000 });
    }, (err: any) => {
      this.isResendingOTP = false;
      if (err?.error?.errorMessage)
        this.snackbar.open(err.error.errorMessage, 'close', { duration: 5000 });
      else
        this.snackbar.open('something went wrong.', 'close', { duration: 5000 });
    });
  }
  verifyOTP(event) {
    event.preventDefault();
    if (!this.otp.invalid) {
      this.isVerifying = true;
      this.otpVerificationService.verifyOTP(this.email, this.otp.value).subscribe((res: any) => {
        this.isVerifying = false;
        if (res?.status) {
          this.emailHasBeenVerifiedEvent.emit(true);
          this.snackbar.open('Email has been verified successfully', 'close', { duration: 5000 });
        } else if (res?.errorMessage) {
          this.isVerifying = false;
          this.snackbar.open(res.errorMessage, 'close', { duration: 5000 });
        } else {
          this.isVerifying = false;
          this.snackbar.open('something went wrong.', 'close', { duration: 5000 });
        }
      }, (err: any) => {
        this.isVerifying = false;
        this.snackbar.open('something went wrong.', 'close', { duration: 5000 });
      });
    }
  }
}
