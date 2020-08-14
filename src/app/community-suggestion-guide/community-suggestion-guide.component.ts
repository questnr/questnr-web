import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CommunitySuggestionGuideService } from './community-suggestion-guide.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Tag } from 'models/common.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { UserInterest } from 'models/user.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Page } from 'models/page.model';
import { Community } from 'models/community.model';

@Component({
  selector: 'app-community-suggestion-guide',
  templateUrl: './community-suggestion-guide.component.html',
  styleUrls: ['./community-suggestion-guide.component.scss']
})
export class CommunitySuggestionGuideComponent implements OnInit {
  isLinear: boolean = true;
  communityTagsForm: FormGroup;
  communityTag: FormControl = new FormControl('', Validators.pattern(/^[A-z0-9 ]*$/));
  tagsCount = new FormControl(0, {
    validators: [
      Validators.min(1),
      Validators.max(10)
    ]
  });
  tagList: Tag[] = [];
  nullError: boolean = false;
  bucketFullError: boolean = false;
  bucketEmptyError: boolean = false;
  tagMaxLengthError: boolean = false;
  tagExistsError: boolean = false;
  @ViewChild("stepper") stepper: MatStepper;
  mobileView: boolean = false;
  searchResults: UserInterest[];
  suggestedCommunityList: Community[];
  loadingData: boolean = false;
  listItems = Array(5);

  constructor(private _communitySuggestionGuideService: CommunitySuggestionGuideService,
    public fb: FormBuilder,
    private dialogRef: MatDialogRef<CommunitySuggestionGuideComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      mobileView: boolean
    }) { }

  ngOnInit(): void {
    this.mobileView = this.data.mobileView;
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

  skipDialog() {
    this.dialogRef.close();
    this._communitySuggestionGuideService.skipCommunitySuggestionGuide().subscribe((res) => {

    });
  }

  nextShowCommuitySuggestions() {
    this.communityTagsForm.markAllAsTouched();
    if (this.communityTagsForm.valid) {
      this.stepper.next();
      this.loadingData = true;
      let communityTags = "";
      this.tagList.forEach((tag: Tag, index: number) => {
        if (index == 0)
          communityTags += tag.value;
        else
          communityTags += "," + tag.value;
      });
      this._communitySuggestionGuideService.getCommunitySuggestionsForGuide(0, communityTags).subscribe((res: Page<Community>) => {
        this.suggestedCommunityList = res?.content ? res.content : [];
        this.loadingData = false;
      });
    }
  }


  resetTagErrors() {
    this.nullError = false;
    this.tagExistsError = false;
    this.bucketFullError = false;
    this.bucketEmptyError = false;
    this.tagMaxLengthError = false;
  }

  finishGuide() {
    this.dialogRef.close();
  }

  hasTagInTagList(value: string) {
    let doesNotHave = false;
    this.tagList.forEach((tag: Tag) => {
      if (tag.value.toLowerCase().trim() === value.toLocaleLowerCase().trim()) {
        doesNotHave = true;
      }
    });
    return doesNotHave;
  }

  addTagToBucket(value: string, isInput: boolean) {
    this.resetTagErrors();
    if (!(value && value.length > 0)) return;
    if (this.hasTagInTagList(value)) {
      this.tagExistsError = true;
      return;
    }
    if (this.tagList.length >= 10) {
      this.bucketFullError = true;
    }
    else {
      if (value.length > 30 && isInput) {
        this.tagMaxLengthError = true;
      } else if (this.communityTag.valid || !isInput) {
        this.tagsCount.setValue(Number(this.tagsCount.value) + 1);
        if (isInput) {
          this.communityTag.setValue("");
          this.searchResults = [];
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
