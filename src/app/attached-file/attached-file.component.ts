import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonService } from 'common/common.service';
import { PostMedia } from 'models/post-action.model';

@Component({
  selector: 'app-attached-file',
  templateUrl: './attached-file.component.html',
  styleUrls: ['./attached-file.component.scss']
})
export class AttachedFileComponent implements OnInit {
  @Input() attachedFileLinkList: PostMedia[];
  attachedFileList: any[];
  @Output() finalizedAttachedFileListListener = new EventEmitter();
  hoveredIndex: number = -1;
  useLink: boolean = false;
  noneFileExtension: string = "unrecognised file";

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
    this.clearAttachedFileList();
    if (this.attachedFileLinkList?.length) {
      this.useLink = true;
    }
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

  pushFile(file) {
    this.attachedFileList.push(file);
  }

  checkFileExtension(file: File) {
    const extension = this.commonService.checkFileExtension(file);
    if (extension) return extension;
    else {
      return this.noneFileExtension;
    }
  }

  removeAttachedFile(ind) {
    if (ind !== -1) {
      this.attachedFileList.splice(ind, 1);
      this.finalizedAttachedList();
    }
  }

  finalizedAttachedList() {
    this.finalizedAttachedFileListListener.emit(this.attachedFileList);
  }

  clearAttachedFileList() {
    this.attachedFileList = [];
  }

  getFileExtension(attachedFile: PostMedia) {
    if (attachedFile?.fileExtension?.length > 0) {
      return attachedFile.fileExtension;
    }
    return this.noneFileExtension;
  }

  downloadAttachedFile(mediaLink: string) {
    console.log("downloadAttachedFile", mediaLink);
    let a = document.createElement('a')
    a.href = mediaLink;
    a.download = mediaLink.split('/').pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}
