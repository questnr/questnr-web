import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StaticMediaSrc } from 'shared/constants/static-media-src';

@Component({
  selector: 'app-img-cropper',
  templateUrl: './img-cropper.component.html',
  styleUrls: ['./img-cropper.component.scss']
})
export class ImgCropperComponent implements OnInit {
  @ViewChild("chooseFileForAvatarRef") chooseFileForAvatarRef: ElementRef;
  mobileView = false;
  screenWidth = window.innerWidth;
  defaultSrc: string = StaticMediaSrc.userFile;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ImgCropperComponent>) {
    if (this.data.aspectRatio)
      this.aspectRatio = this.data.aspectRatio;
    if (this.data.isCommunityAvatar) {
      this.defaultSrc = StaticMediaSrc.communityFile;
    }
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
  }
  imageChangedEvent: any = '';
  croppedImage: any = '';
  filename: string;
  aspectRatio: number = 4 / 3;

  uploadImage() {
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
  actionDone() {
    this.dialogRef.close(this.dataURLtoFile(this.croppedImage));
  }
}
