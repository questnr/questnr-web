import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { LoginService } from 'auth/login.service';
import { FeedsService } from 'feeds-frame/feeds.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { IFramelyService } from '../../meta-card/iframely.service';
import { MetaCardComponent } from 'meta-card/meta-card.component';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss'],
  animations: [
    trigger('expand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PostFeedComponent {
  @Input() isCommunityPost = false;
  @Input() communityId;
  @ViewChild('metaCardCompRef') metaCardCompRef: MetaCardComponent;
  isLoading = false;
  uploading = false;
  uploadProgress = 0;
  text = new FormControl();
  profileImg;
  addedMedias = [];
  addedMediaSrc = [];
  @Output() postData = new EventEmitter();
  apiUrl: any;
  isMediaEnabled = false;
  url: RegExp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  detectedLink: string;

  constructor(public login: LoginService, private service: FeedsService, private iFramelyService: IFramelyService) { }
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
    files.forEach((file: any) => {
      if (file.type.includes('image') || file.type.includes('video')) {
        this.addedMedias.push(file);
        this.loadPreview(file);
      }
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
  removeMedia(index) {
    this.addedMedias.splice(index, 1);
    this.addedMediaSrc.splice(index, 1);
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
      if (this.isCommunityPost && this.communityId != null) {
        this.apiUrl = 'user/community/' + this.communityId + '/posts';
      } else {
        this.apiUrl = 'user/posts';
      }
      this.service.postFeed(formData, this.apiUrl).subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploading = true;
            this.uploadProgress = Math.round(event.loaded / event.total * 100);
          } else if (event.type === HttpEventType.Response) {
            this.postData.emit(event.body);
            this.reset();
          }
        }, err => { this.reset(); }
      );
    }
  }
  isPostInvalid() {
    if (this.text.value || this.addedMedias.length) {
      return false;
    }
    return true;
  }
  reset() {
    this.isLoading = false;
    this.uploading = false;
    this.isMediaEnabled = false;
    this.uploadProgress = 0;
    this.text.setValue('');
    this.addedMediaSrc = this.addedMedias = [];
  }


  parseTextToFindURL(e): string {
    // @ts-ignore
    // tslint:disable-next-line:one-variable-per-declaration
    let urls, output = '';

    if (e.target.value === '') {
      this.detectedLink = null;
    }

    // if (urls.data('curr_val') == urls) //if it still has same value
    // return false; //returns false

    // 8 = backspace
    // 46 = delete

    if (e.keyCode === 8 && e.keyCode !== 9 && e.keyCode !== 13 && e.keyCode !== 32 && e.keyCode !== 46) {
      // Return is backspace, tab, enter, space or delete was not pressed.
      return;
    }

    // GC keyCodes
    if (e.keyCode !== 46 && e.keyCode === 17) {
      // Return is backspace, tab, enter, space or delete was not pressed.
      return;
    }
    // tslint:disable-next-line:no-conditional-assignment
    while ((urls = this.url.exec(e.target.value)) !== null) {
      output += urls[0];
      this.detectedLink = output;
      // console.log("URLS: " + output.substring(0, output.length));

      // $("#result").html("").addClass("loaded");

    }

    // tslint:disable-next-line:no-conditional-assignment
    if (urls = this.url.exec(e.target.value) == null) {
      this.detectedLink = null;
    }
    // console.log("URLS: " + output.substring(0, output.length - 2));

    // setTimeout(function() {


    // if (output != this.lastURL) { // ctrl = 17
    //   this.detectedLink = output;
    //   console.log('Not the same URL');
    //   this.lastURL = this.detectedLink;
    // }
  }
}
