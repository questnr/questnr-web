import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from '../global.service';
import { ImgCropperComponent } from './img-cropper/img-cropper.component';

@Component({
  selector: 'app-img-cropper-wrapper',
  templateUrl: './img-cropper-wrapper.component.html',
  styleUrls: ['./img-cropper-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImgCropperWrapperComponent implements OnInit {
  mobileView: boolean = false;
  @Output() imageDataEvent = new EventEmitter();
  @Input() aspectRatio: number;
  @Input() isCommunityAvatar: boolean = false;

  constructor(private dialog: MatDialog,
    private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

  ngAfterViewInit() {
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
