import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {REGEX} from '../../../constants';
import {AsyncValidator, CustomValidations} from '../../../../custom-validations';
import {LoginService} from '../../../../auth/login.service';
import {UserActivityService} from '../../../../user-activity/user-activity.service';
import {ActivatedRoute} from '@angular/router';
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

  constructor(public fb: FormBuilder, private auth: LoginService, public profilePageService: UserProfilePageService, @Inject(MAT_DIALOG_DATA) private data: any,
              public dialogRef: MatDialogRef<EditUserComponent>) {
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
      lastName: this.lastName
      // username: this.username
    });
    this.profilePageService.getUserProfile(this.data.slug).subscribe((res: User) => {
      // this.group.controls.username.setValue(res.username);
      this.group.controls.firstName.setValue(res.firstName);
      this.group.controls.lastName.setValue(res.lastName);
    }, error => console.log(error.error.errorMessage));
  }

  submit() {
    if (this.group.valid) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
