import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommunityService } from './create-community.servive';
import { HttpHeaders } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.scss']
})

export class CreateCommunityComponent implements OnInit {
  @Input() communityImage = 'assets/default.jpg';

  constructor(public fb: FormBuilder, public auth: CommunityService, public snackbar: MatSnackBar, private dialogRef: MatDialogRef<CreateCommunityComponent>) {
  }

  src: any;
  group: FormGroup;
  communityName = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  avatar = new FormControl(null);
  userCommunityimage: any;
  isFormDisabled = true;
  loading = false;
  ngOnInit() {
    this.group = this.fb.group({
      communityName: this.communityName,
      description: this.description,
      avatar: this.avatar
    });
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.communityImage = reader.result as string;
        if (event.target.files.length > 0) {
          this.userCommunityimage = event.target.files[0];
          this.group.get('avatar').updateValueAndValidity();
        }
      };

    }
  }

  previewImage() {
    const src = document.getElementById('imageSrc').click();
  }

  submit() {
    if (this.group.valid) {
      this.loading = true;
      const formData: FormData = new FormData();
      formData.set('communityName', this.group.get('communityName').value);
      formData.set('description', this.group.get('description').value);
      if (this.group.get('avatar').value != null){
        formData.set('avatarFile', this.userCommunityimage, this.userCommunityimage.name);
      }
      this.auth.createCommunity(formData).subscribe((res: any) => {
        this.loading = false;
        this.dialogRef.close();
        this.snackbar.open('community created successfully', 'close',{duration: 5000});
      }, error => {
        this.loading = false;
        this.snackbar.open('something went wrong.', 'close',{duration: 5000});
        this.dialogRef.close();
      });
    }
  }
  checkFormValid() {
    this.isFormDisabled = this.group.valid;
  }

}