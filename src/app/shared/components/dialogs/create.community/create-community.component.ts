import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CommunityService} from './create-community.servive';
import {HttpHeaders} from '@angular/common/http';

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
  file = new FormControl('');
  userCommunityimage: any;

  ngOnInit() {
    this.group = this.fb.group({
      communityName: this.communityName,
      description: this.description,
      file: this.file
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
        }
      };

    }
  }

  previewImage() {
    const src = document.getElementById('imageSrc').click();
  }

  submit() {
    if (this.group.valid) {
      const name = this.group.controls.communityName.value;
      const desc = this.group.controls.description.value;
      const file = this.userCommunityimage;
      const formdata = new FormData();
      formdata.append('communityName', name);
      formdata.append('description', desc);
      formdata.append('file', file);
      this.auth.createCommunity(formdata).subscribe();
    }
  }

}
