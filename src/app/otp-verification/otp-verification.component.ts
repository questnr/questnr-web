import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { OTPVerificationService } from './otp-verification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'common/common.service';

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
  canResend: boolean = true;
  timeToEnableResend: string;
  secondsAfterEnableResend: number = 120;
  changingSecondsAfterEnableResend: number = 120;
  @Output() emailHasBeenVerifiedEvent = new EventEmitter();
  otp = new FormControl('',
    [
      Validators.required
    ]);

  constructor(private otpVerificationService: OTPVerificationService, private commonService: CommonService,
    public snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  sendOTP(event) {
    event.preventDefault();
    this.isSendingOTP = true;
    this.hasOTPBeenSent = false;
    this.otpVerificationService.sendOTP(this.email).subscribe((res: any) => {
      this.snackbar.open('OTP has been sent successfully', 'close', { duration: 5000 });
      this.startResendEnableTimer();
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
    if (this.canResend) {
      this.isResendingOTP = true;
      this.otpVerificationService.resendOTP(this.email).subscribe((res: any) => {
        this.startResendEnableTimer();
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
  }
  startResendEnableTimer() {
    this.canResend = false;
    this.changingSecondsAfterEnableResend = this.secondsAfterEnableResend;
    let resendEnableTimer = setInterval(() => {
      let minutes = Math.floor(this.changingSecondsAfterEnableResend / 60);
      let seconds = Math.floor(this.changingSecondsAfterEnableResend % 60);
      this.timeToEnableResend = this.commonService.appendZero(minutes) + ":" + this.commonService.appendZero(seconds);
      this.changingSecondsAfterEnableResend--;
      if (this.changingSecondsAfterEnableResend === 0) {
        clearInterval(resendEnableTimer);
        this.canResend = true;
      }
    }, 1000);
  }

  verifyOTP(event) {
    event.preventDefault();
    if (!this.otp.invalid) {
      this.isVerifying = true;
      this.otpVerificationService.verifyOTP(this.email, this.otp.value).subscribe((res: any) => {
        this.isVerifying = false;
        if (res?.status) {
          this.emailHasBeenVerifiedEvent.emit({ hasVerified: true, otp: this.otp.value });
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
