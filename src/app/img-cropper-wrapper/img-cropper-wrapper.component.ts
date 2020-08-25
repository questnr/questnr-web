import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImgCropperComponent } from './img-cropper/img-cropper.component';

@Component({
  selector: 'app-img-cropper-wrapper',
  templateUrl: './img-cropper-wrapper.component.html',
  styleUrls: ['./img-cropper-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImgCropperWrapperComponent implements OnInit {

  mobileView: boolean = false;
  screenWidth = window.innerWidth;
  @Output() imageDataEvent = new EventEmitter();
  @Input() aspectRatio: number;
  @Input() isCommunityAvatar: boolean = false;

  constructor(private dialog: MatDialog) { }

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

  openImageCropper() {
    let config = null;
    if (this.mobileView) {
      config = {
        position: {
          top: '0',
          right: '0'
        },
        height: '100%',
        borderRadius: '0px',
        width: '100%',
        maxWidth: '100vw',
        marginTop: '0px',
        marginRight: '0px !important',
        panelClass: 'opened-modal',
        data: {
          aspectRatio: this.aspectRatio,
          isCommunityAvatar: this.isCommunityAvatar
        }
      };
    } else {
      config = {
        width: '600px',
        maxHeight: "90vh",
        panelClass: 'opened-modal',
        data: {
          aspectRatio: this.aspectRatio,
          isCommunityAvatar: this.isCommunityAvatar
        }
      };
    }
    const dialogRef = this.dialog.open(ImgCropperComponent, config);

    dialogRef.afterClosed().subscribe(imageData => {
      this.imageDataEvent.emit(imageData);
    });
  }

}
