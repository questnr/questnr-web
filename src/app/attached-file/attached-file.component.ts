import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonService } from 'common/common.service';
import { PostMedia } from 'models/post-action.model';

@Component({
  selector: 'app-attached-file',
  templateUrl: './attached-file.component.html',
  styleUrls: ['./attached-file.component.scss']
})
export class AttachedFileComponent implements OnInit {
  @Input() ind: number;
  @Input() useLink: boolean = false;
  @Input() attachedFile: File;
  @Input() attachedFileLink: PostMedia;
  @Output() downloadError = new EventEmitter();
  @Output() removeAttachedFileListener = new EventEmitter();
  hoveredIndex: number = -1;
  noneFileExtension: string = "unrecognised file";

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
  }

  hover(ind) {
    if (this.hoveredIndex != ind)
      this.hoveredIndex = ind;
  }

  unhover() {
    setTimeout(() => {
      if (this.hoveredIndex != -1)
        this.hoveredIndex = -1;
    }, 2000);
  }

  shouldShow(ind) {
    return ind === this.hoveredIndex;
  }

  checkFileExtension(file: File) {
    const extension = this.commonService.checkFileExtension(file);
    if (extension) return extension;
    else {
      return this.noneFileExtension;
    }
  }

  removeAttachedFile(ind) {
    this.removeAttachedFileListener.emit(ind);
  }

  getFileExtension(attachedFile: PostMedia) {
    if (attachedFile?.fileExtension?.length > 0) {
      return attachedFile.fileExtension;
    }
    return this.noneFileExtension;
  }

  downloadAttachedFile(mediaLink: string) {
    if (mediaLink) {
      let a = document.createElement('a')
      a.href = mediaLink;
      a.download = mediaLink.split('/').pop()
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
    else {
      this.downloadError.emit();
    }
  }
}
