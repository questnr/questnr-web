import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommunityService } from './create-community.servive';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.scss']
})

export class CreateCommunityComponent implements OnInit {
  @Input() communityImage = 'assets/add.png';

  constructor(public fb: FormBuilder, public auth: CommunityService) {
  }

  src: any;
  group: FormGroup;
  communityName = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  avatar = new FormControl(null);
  userCommunityimage: any;

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
      const formData: FormData = new FormData();
      formData.set('communityName', this.group.get('communityName').value);
      formData.set('description', this.group.get('description').value);
      if (this.group.get('avatar').value != null){
        formData.set('avatarFile', this.userCommunityimage, this.userCommunityimage.name);
      }
      this.auth.createCommunity(formData).subscribe();
    }
  }

}
