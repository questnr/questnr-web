import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StaticMediaSrc } from 'shared/constants/static-media-src';
import { GlobalService } from 'global.service';

@Component({
  selector: 'app-img-cropper',
  templateUrl: './img-cropper.component.html',
  styleUrls: ['./img-cropper.component.scss']
})
export class ImgCropperComponent implements OnInit {
  @ViewChild("chooseFileForAvatarRef") chooseFileForAvatarRef: ElementRef;
  mobileView = false;
  defaultSrc: string = StaticMediaSrc.userFile;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ImgCropperComponent>,
    public _globalService: GlobalService) {
    if (this.data.aspectRatio)
      this.aspectRatio = this.data.aspectRatio;
    if (this.data.isCommunityAvatar) {
      this.defaultSrc = StaticMediaSrc.communityFile;
    }
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.mobileView = this._globalService.isMobileView();
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  filename: string;
  aspectRatio: number = 4 / 3;
  hasError: boolean = false;

  uploadImage() {
    this.hasError = false;
    this.chooseFileForAvatarRef.nativeElement.click();
  }

  dataURLtoFile(dataurl) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], this.filename, { type: mime });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.filename = event?.target?.files[0]?.name;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
  }
  loadImageFailed() {
    // show message
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  actionCancel() {
    this.dialogRef.close();
  }
  actionDone() {
    if (this.imageChangedEvent)
      this.dialogRef.close(this.dataURLtoFile(this.croppedImage));
    else
      this.hasError = true;
  }

  filesDropped(droppedFiles) {
    this.hasError = false;
    const files = Object.values(droppedFiles);
    let file: any = files[0];
    if (file.type.includes('image')) {
      this.fileChangeEvent({ target: { files: droppedFiles } })
    }
  }
}
