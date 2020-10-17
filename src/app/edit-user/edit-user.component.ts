import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmoticonsComponent } from 'emoticons/emoticons.component';
import { GlobalService } from 'global.service';
import { LoginService } from '../auth/login.service';
import { CommonService } from '../common/common.service';
import { AsyncValidator } from '../custom-validations';
import { User } from '../models/user.model';
import { GlobalConstants } from '../shared/constants';
import { UserProfilePageService } from '../user-profile-page/user-profile-page.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditUserComponent implements OnInit, AfterViewInit {
  group: FormGroup;
  errMsg = '';
  successMsg = '';
  formError = '';
  isLoading: boolean = false;
  mobileView: boolean = false;
  isFetchingDetails: boolean = true;
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
  title: string = "Edit Profile";
  bioInputRef: ElementRef;
  @ViewChild("bioInput")
  set bioInput(bioInputRef: ElementRef) {
    this.bioInputRef = bioInputRef;
  }
  emoticationRef: EmoticonsComponent;
  @ViewChild("emotication")
  set emotication(emoticationRef: EmoticonsComponent) {
    this.emoticationRef = emoticationRef;
    this.emoticationRef?.setUserInputRef(this.bioInputRef);
  }

  constructor(public fb: FormBuilder,
    private auth: LoginService,
    public profilePageService: UserProfilePageService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<EditUserComponent>,
    public router: Router,
    private commonService: CommonService,
    private _globalService: GlobalService) {
  }

  ngOnInit() {
    this.mobileView = this._globalService.isMobileView();
    this.group = this.fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      dob: this.dob,
      bio: this.bio
    });

    this.isFetchingDetails = true;
    this.profilePageService.getUserProfile(this.data.slug).subscribe((res: User) => {
      this.group.controls.username.setValue(res.username);
      this.group.controls.firstName.setValue(res.firstName);
      this.group.controls.lastName.setValue(res.lastName);
      this.group.controls.bio.setValue(res.bio);
      this.group.controls.dob.setValue(this.commonService.getDateFromNumber(res.dob));
      this.isFetchingDetails = false;
    }, error => {
      // console.log(error.error.errorMessage)
    });
  }

  ngAfterViewInit() {
  }

  submit() {
    if (this.group.valid) {
      this.isLoading = true;
      const obj = { ...this.group.value, dob: this.commonService.getDateFromNumber(this.group.get("dob").value) };
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
