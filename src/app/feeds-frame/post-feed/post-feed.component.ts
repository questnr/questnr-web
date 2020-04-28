import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { LoginService } from 'auth/login.service';
import { FeedsService } from 'feeds-frame/feeds.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('expand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PostFeedComponent {
  isLoading = false;
  uploading = false;
  uploadProgress = 0;
  text = new FormControl();
  profileImg;
  addedMedias = [];
  addedMediaSrc = [];
  @Output() postData = new EventEmitter();

  isMediaEnabled = false;

  constructor(private login: LoginService, private service: FeedsService) {
    // this.profileImg = this.login.getUserProfileIcon();
    this.login.getUser().subscribe(
      (res) => {
        this.profileImg = res.avatarLink;
      }
    );
  }
  toggleAddMedia() {
    if (this.isMediaEnabled) {
      this.addedMedias = [];
      this.addedMediaSrc = [];
      this.isMediaEnabled = false;
    } else {
      this.isMediaEnabled = true;
    }
  }

  filesDropped(droppedFiles) {
    const files = Object.values(droppedFiles);
    console.log(files);
    files.forEach((file: any) => {
      if (file.type.includes('image') || file.type.includes('video')) {
        this.addedMedias.push(file);
        this.loadPreview(file);
      }
      // console.log(droppedFiles[0].file.name);
    });
  }
  loadPreview(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const obj = { type: file.type, src: reader.result };
      this.addedMediaSrc.push(obj);
    };
  }
  selectFiles(event) {
    if (event.target.files.length > 0) {
      this.filesDropped(event.target.files);
    }
  }
  postFeed() {
    if (this.text.value || this.addedMediaSrc.length) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('text', this.text.value);
      if (this.addedMedias.length) {
        this.addedMedias.forEach(file => {
          formData.append('files', file);
        });
      }
      this.service.postFeed(formData).subscribe(
        (event: HttpEvent<any>) => {
          console.log(event, this.uploadProgress);
          if (event.type === HttpEventType.UploadProgress) {
            this.uploading = true;
            this.uploadProgress = Math.round(event.loaded / event.total * 100);
          } else if (event.type === HttpEventType.Response) {
            this.reset();
          }
        }, err => { this.reset(); }
      );
    }
  }
  reset() {
    this.isLoading = false;
    this.uploading = false;
    this.isMediaEnabled = false;
    this.uploadProgress = 0;
    this.postData.emit(true);
    this.text.setValue('');
    this.addedMediaSrc = this.addedMedias = [];
  }
}
