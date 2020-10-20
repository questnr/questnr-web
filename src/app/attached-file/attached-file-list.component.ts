import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonService } from 'common/common.service';
import { PostMedia } from 'models/post-action.model';

@Component({
  selector: 'app-attached-file-list',
  templateUrl: './attached-file-list.component.html',
  styleUrls: ['./attached-file-list.component.scss']
})
export class AttachedFileListComponent implements OnInit {

  @Input() attachedFileLinkList: PostMedia[];
  attachedFileList: any[];
  @Output() downloadError = new EventEmitter();
  @Output() finalizedAttachedFileListListener = new EventEmitter();
  useLink: boolean = false;

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
    this.clearAttachedFileList();
    if (this.attachedFileLinkList?.length) {
      this.useLink = true;
    }
  }

  pushFile(file) {
    this.attachedFileList.push(file);
  }

  clearAttachedFileList() {
    this.attachedFileList = [];
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

  downloadErrorListener($event) {
    this.downloadError.emit();
  }
}
