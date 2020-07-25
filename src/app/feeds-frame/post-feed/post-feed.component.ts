import { Component, Output, EventEmitter, Input, ViewChild, ElementRef, OnInit, Inject, Renderer2 } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { LoginService } from 'auth/login.service';
import { FeedsService } from 'feeds-frame/feeds.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { HashTagService } from 'feeds-frame/hash-tag-service';
import { MetaCardComponent } from 'meta-card/meta-card.component';
import { CommonService } from 'common/common.service';
import { IFramelyData } from 'models/iframely.model';
import { IFramelyService } from 'meta-card/iframely.service';
import { emojis } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { FloatingSuggestionBoxComponent } from 'floating-suggestion-box/floating-suggestion-box.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostEditorType } from 'models/post-action.model';

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
export class PostFeedComponent implements OnInit {
  @ViewChild('userInputRef') userInputRef: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;

  @ViewChild('floatingSuggestionBoxRef')
  set floatingSuggestionBoxRef(element: FloatingSuggestionBoxComponent) {
    setTimeout(() => {
      this.floatingSuggestionBoxElement = element;
      this.hashTagService.registerFloatingSuggestionBoxElement(this.floatingSuggestionBoxElement);
    }, 0);
  }

  floatingSuggestionBoxElement: FloatingSuggestionBoxComponent;
  // @Input() isCommunityPost = false;
  // @Input() communityId;
  // @ViewChild("metaCardCompRef") metaCardCompRef: MetaCardComponent;
  iFramelyData: IFramelyData;
  isLoading = false;
  uploading = false;
  uploadProgress = 0;
  text = new FormControl();
  richText: string;
  profileImg;
  addedMedias = [];
  addedMediaSrc = [];
  // @Output() postData = new EventEmitter();
  apiUrl: any;
  isMediaEnabled = false;
  textAreaInput: string;
  isHashOn = false;
  isBlogEditor = false;
  myckeditor: any;
  @Input() editing: any;

  constructor(public login: LoginService,
    private service: FeedsService,
    private hashTagService: HashTagService,
    private commonService: CommonService,
    private iFramelyService: IFramelyService,
    public dialogRef: MatDialogRef<PostFeedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    public renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    // console.log(this.data);
  }

  ngAfterViewInit(key: string): void {
    this.hashTagService.registerInputElement(this.userInputRef.nativeElement);
    if (this.data.feed) {
      if (this.data?.feed?.postEditorType == PostEditorType.blog) {
        this.isBlogEditor = true;
        this.richText = this.data.feed.text;
      } else {
        this.text.setValue(this.data.feed.text);
      }
      // this.editing = true;
      const event = new KeyboardEvent('keyup', { bubbles: true });
      this.userInputRef.nativeElement.dispatchEvent(event);
    }
    if (this.data.addMediaAction) {
      const el = this.fileInput.nativeElement;
      el.click();
    }
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
    files.forEach((file: any) => {
      if (file.type.includes('image') || file.type.includes('video')) {
        this.addedMedias.push(file);
        this.loadPreview(file);
        this.isMediaEnabled = true;
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
    if ((this.text.value && !this.isBlogEditor) ||
      (this.richText && this.isBlogEditor) || this.addedMediaSrc.length) {
      this.isLoading = true;
      if (this.data.editing) {
        this.service.editPost(this.isBlogEditor ? this.richText : this.text.value, this.data.feed.postActionId).subscribe((res: any) => {
          this.uploading = true;
          this.closeDialog(res);
          // console.log('close', res);
          this.snackBar.open('Post Edited Successfully', 'close', { duration: 5000 });
        });
      } else {
        const formData = new FormData();
        formData.append("postEditorType", this.isBlogEditor ? "blog" : "normal");
        if (this.isBlogEditor) {
          formData.append('text', this.richText);
        } else {
          formData.append('text', this.text.value);
        }
        if (this.addedMedias.length) {
          this.addedMedias.forEach(file => {
            formData.append('files', file);
          });
        }
        if (this.data.isCommunityPost && this.data.communityId != null) {
          this.apiUrl = 'user/community/' + this.data.communityId + '/posts';
        } else {
          this.apiUrl = 'user/posts';
        }
        this.service.postFeed(formData, this.apiUrl).subscribe(
          (event: HttpEvent<any>) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.uploading = true;
              this.uploadProgress = Math.round(event.loaded / event.total * 100);
            } else if (event.type === HttpEventType.Response) {
              // this.postData.emit(event.body);
              this.closeDialog(event.body);
              this.reset();
            }
          }, err => {
            this.reset();
          }
        );
      }
    }
  }

  isPostInvalid() {
    if ((!this.isBlogEditor && this.text.value)
      || this.addedMedias.length
      || (this.isBlogEditor && this.richText && this.richText.length > 0)) {
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
    this.iFramelyData = null;
    this.isBlogEditor = false;
    this.addedMediaSrc = this.addedMedias = [];
    this.richText = '';
    if (this.myckeditor) {
      this.myckeditor.value = '';
    }
  }

  typeCheckOnUserInput(e): string {
    if (e.target && e.target.value == '') {
      this.isHashOn = false;
      this.iFramelyData = null;
      this.hashTagService.clearHashCheck();
      return;
    }

    if (!!e.keyCode) {
      this.isHashOn = this.hashTagService.typeCheckForHashTag(e, this.isHashOn);
    }
    // if (this.isHashOn) {
    //   this.hashTagService.hideHashTagSuggesionList();
    // }
    // console.log("this.isHashOn", this.isHashOn);

    //8 = backspace
    //46 = delete

    if (e.keyCode == 8 && e.keyCode !== 9 && e.keyCode !== 13 && e.keyCode !== 32 && e.keyCode !== 46) {
      // Return is backspace, tab, enter, space or delete was not pressed.
      return;
    }

    // GC keyCodes
    if (e.keyCode !== 46 && e.keyCode == 17) {
      // Return is backspace, tab, enter, space or delete was not pressed.
      return;
    }

    if (e.target && e.target.value) {
      let detectedLink = this.commonService.parseTextToFindURL(e.target.value);
      this.iFramelyService.getIFramelyData(detectedLink).then((iFramelyData: IFramelyData) => {
        this.iFramelyData = iFramelyData;
        // this.metaCardCompRef.setIFramelyData(iFramelyData);
      });
    }

    // if (output != this.detectedLink) {
    //   this.detectedLink = output;
    //   console.log('Not the same URL');
    // }
  }

  addEmoji(event) {
    // console.log(event);
    const text = this.text.value ? this.text?.value : '';
    const start = this.userInputRef.nativeElement.selectionStart;
    const end = this.userInputRef.nativeElement.selectionEnd;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    this.text.setValue(before + event.native + after);
  }

  switchEditor(isBlogEditor) {
    this.isBlogEditor = isBlogEditor;
  }

  typeCheckOnUserInputEvent($event) {
    // console.log("richText", $event);
    this.richText = $event;
  }

  registerEditor(myckeditor: any) {
    this.myckeditor = myckeditor;
    // console.log("mycdkEditor", myckeditor);
  }
  closeDialog(data) {
    this.dialogRef.close({ data });
  }
}
