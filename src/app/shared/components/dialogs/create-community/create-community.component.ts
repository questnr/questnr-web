import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { CommunitySuggestionGuideService } from 'community-suggestion-guide/community-suggestion-guide.service';
import { GlobalService } from 'global.service';
import { ImgCropperWrapperComponent } from 'img-cropper-wrapper/img-cropper-wrapper.component';
import { Tag } from 'models/common.model';
import { Community } from 'models/community.model';
import { UserInterest } from 'models/user.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { GlobalConstants } from 'shared/constants';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { CreateCommunityService } from './create-community.servive';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }],
  encapsulation: ViewEncapsulation.None
})
export class CreateCommunityComponent implements OnInit {
  @Input() communityImage;
  @ViewChild("imageCropperRef") imageCropperRef: ImgCropperWrapperComponent;
  mobileView: boolean = false;
  isLinear: boolean = true;
  defaultSrc: string = StaticMediaSrc.communityFile;
  @ViewChild("stepper") stepper: MatStepper;
  showAvatarNotSet: boolean = false;

  src: any;
  communityDetailsForm: FormGroup;
  communityName = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]
  });
  description = new FormControl('', {
    validators: [
      Validators.required,
      Validators.maxLength(200)
    ]
  });
  communityAvatarForm: FormGroup;
  avatar = new FormControl(null);
  communityTagsForm: FormGroup;
  communityTag = new FormControl('', Validators.pattern(/^[A-z0-9 ]*$/));
  tagsCount = new FormControl(0, {
    validators: [
      Validators.max(5),
      Validators.min(2)
    ]
  });
  tagList: Tag[] = [];
  nullError: boolean = false;
  bucketFullError: boolean = false;
  bucketEmptyError: boolean = false;
  tagMaxLengthError: boolean = false;
  tagExistsError: boolean = false;
  userCommunityimage: any;
  isFormDisabled = true;
  isCreatingCommunity: boolean = false;
  searchResults: UserInterest[];
  suggestedCommunityList: Community[];

  constructor(public fb: FormBuilder,
    public auth: CreateCommunityService,
    public snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateCommunityComponent>,
    private router: Router,
    private _communitySuggestionGuideService: CommunitySuggestionGuideService,
    private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
    this.communityDetailsForm = this.fb.group({
      communityName: this.communityName,
      description: this.description,
    });
    this.communityAvatarForm = this.fb.group({
      avatar: this.avatar
    })
    this.communityTagsForm = this.fb.group({
      communityTag: this.communityTag,
      tagsCount: this.tagsCount
    });
    this.communityTag.valueChanges
      .pipe(debounceTime(200))
      .pipe(distinctUntilChanged())
      .subscribe((queryField) => {
        if (!queryField || queryField.length < 1) {
          this.searchResults = [];
        } else {
          this._communitySuggestionGuideService.searchUserInterest(queryField)
            .subscribe((response: UserInterest[]) => {
              this.searchResults = response;
            })
        }
      });
  }
  // onFileChange(event) {
  //   const reader = new FileReader();

  //   if (event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     reader.readAsDataURL(file);

  //     reader.onload = () => {

  //       this.communityImage = reader.result as string;
  //       if (event.target.files.length > 0) {
  //         this.userCommunityimage = event.target.files[0];
  //         this.group.get('avatar').updateValueAndValidity();
  //       }
  //     };

  //   }
  // }

  imageDataReceiver(file) {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.communityImage = reader.result as string;
        this.userCommunityimage = file;
        this.communityAvatarForm.get('avatar').updateValueAndValidity();
      };
    }
  }

  previewImage() {
    // const src = document.getElementById('imageSrc').click();
    this.imageCropperRef.openImageCropper();
  }

  submit() {
    if (this.communityDetailsForm.valid
      && this.tagsCount.value < 5 && this.tagsCount.value >= 2) {
      this.isCreatingCommunity = true;
      let communityTags = "";
      this.tagList.forEach((tag: Tag, index: number) => {
        if (index == 0)
          communityTags += tag.value;
        else
          communityTags += "," + tag.value;
      });
      const formData: FormData = new FormData();
      formData.set('communityName', this.communityDetailsForm.get('communityName').value);
      formData.set('description', this.communityDetailsForm.get('description').value);
      formData.set('communityTags', communityTags);
      if (this.userCommunityimage != null) {
        formData.set('avatarFile', this.userCommunityimage, this.userCommunityimage.name);
      }
      this.auth.createCommunity(formData).subscribe((community: Community) => {
        console.log("community", community);
        this.router.navigate(["/", GlobalConstants.communityPath, community.slug]);
        this.isCreatingCommunity = false;
        this.dialogRef.close();
        this.snackbar.open('community created successfully', 'close', { duration: 5000 });
      }, error => {
        this.isCreatingCommunity = false;
        let showError;
        error?.error?.errorMessage ? showError = error.error.errorMessage : showError = 'something went wrong.';
        this.snackbar.open(showError, 'close', { duration: 5000 });
        this.dialogRef.close();
      });
    }
  }
  checkFormValid() {
    this.isFormDisabled = this.communityDetailsForm.valid && this.communityAvatarForm.valid;
  }

  skipCommunityAvatar() {
    this.showAvatarNotSet = false;
    this.userCommunityimage = null;
    this.communityImage = null;
    this.avatar.setValue(null);
    this.stepper.next();
  }

  nextCommunityAvatar() {
    if (!this.userCommunityimage) {
      this.showAvatarNotSet = true;
    } else {
      this.stepper.next();
      this.showAvatarNotSet = false;
    }
  }

  nextCommunityTags() {
    this.resetTagErrors();
    if (this.tagList.length < 2) {
      this.nullError = true;
    } else {
      this.stepper.next();
      this.submit();
    }
  }

  resetTagErrors() {
    this.nullError = false;
    this.tagExistsError = false;
    this.bucketFullError = false;
    this.bucketEmptyError = false;
    this.tagMaxLengthError = false;
  }

  hasTagInTagList(value: string) {
    let doesNotHave = false;
    this.tagList.forEach((tag: Tag) => {
      if (tag.value.toLocaleLowerCase() === value.toLocaleLowerCase()) {
        doesNotHave = true;
      }
    });
    return doesNotHave;
  }

  addTagToBucket(value: string, isInput: boolean) {
    this.resetTagErrors();
    if (!(value && value.length > 0)) return;
    value = value.trim();
    if (this.hasTagInTagList(value)) {
      this.tagExistsError = true;
      return;
    }
    if (this.tagList.length >= 5) {
      this.bucketFullError = true;
    }
    else {
      this.searchResults = [];
      if (value.length > 30 && isInput) {
        this.tagMaxLengthError = true;
      } else if (this.communityTag.valid || !isInput) {
        this.tagsCount.setValue(Number(this.tagsCount.value) + 1);
        if (isInput) {
          this.communityTag.setValue("");
        }
        this.tagList.push(new Tag(value.toLocaleUpperCase()));
      }
    }
  }

  removeTagFromBucket(index: number) {
    if (this.tagList.length <= 0) {
      this.bucketEmptyError = true;
    } else {
      this.tagsCount.setValue(Number(this.tagsCount.value) - 1);
      if (index != -1)
        this.tagList.splice(index, 1);
      // this.tagList = this.tagList.filter(function (val, index, arr) { return val.value != tag.value; });
    }
  }
}
