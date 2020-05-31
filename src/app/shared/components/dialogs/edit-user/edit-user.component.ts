import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GlobalConstants, REGEX} from '../../../constants';
import {AsyncValidator, CustomValidations} from '../../../../custom-validations';
import {LoginService} from '../../../../auth/login.service';
import {UserActivityService} from '../../../../user-activity/user-activity.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserProfilePageService} from '../../../../user-profile-page/user-profile-page.service';
import {User} from '../../../../models/user.model';
import set = Reflect.set;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  group: FormGroup;
  errMsg = '';
  successMsg = '';
  formError = '';
  isLoading = false;
  screenWidth = window.innerWidth;
  mobileView = false;
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
  dob = new FormControl('', Validators.required);
  bio = new FormControl('');
  maxAllowedDOB = new Date(new Date().setFullYear(new Date().getFullYear() - GlobalConstants.signUpAgeRestriction));


  constructor(public fb: FormBuilder, private auth: LoginService, public profilePageService: UserProfilePageService, @Inject(MAT_DIALOG_DATA) private data: any,
              public dialogRef: MatDialogRef<EditUserComponent>, public router: Router) {
  }

  ngOnInit() {
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
    this.group = this.fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      dob: this.dob,
      bio: this.bio
    });
    this.profilePageService.getUserProfile(this.data.slug).subscribe((res: User) => {
      this.group.controls.username.setValue(res.username);
      this.group.controls.firstName.setValue(res.firstName);
      this.group.controls.lastName.setValue(res.lastName);
      this.group.controls.bio.setValue(res.bio);
      // this.group.controls.dob.setValue();
      console.log(res);
    }, error => console.log(error.error.errorMessage));
  }

  submit() {
    if (this.group.valid) {
      this.isLoading = true;
      const obj = {...this.group.value, dob: new Date(this.dob.value).getTime()};
      this.profilePageService.updateUser(obj).subscribe((res: any) => {
        this.isLoading = false;
        if (res.loginSuccess) {
          this.successMsg = 'Profile details updated successfully';
          localStorage.setItem('token', res.accessToken);
          setTimeout(() => {
            this.onNoClick();
            window.location.reload();
          }, 2000);
        }
      }, error => {
        this.errMsg = 'Failed to update profile';
        setTimeout(() => {
          this.onNoClick();
        }, 2000);
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
