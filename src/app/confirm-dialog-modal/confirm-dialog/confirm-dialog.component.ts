import { Component, OnInit, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'global.service';
import { ConfirmDialogContentType, ConfirmDialogData } from 'models/confirm-dialog.model';
import { KnowMoreLinkType } from 'models/know-more-type';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  title: string = "Are You Sure?";
  agreeText: string = "Yes";
  disagreeText: string = "No";
  mobileView: boolean = false;
  ConfirmDialogContentType = ConfirmDialogContentType;
  confirmDialogContentType: ConfirmDialogContentType;
  @ViewChild("agreeTextBtn") agreeTextBtn: ElementRef;
  @ViewChild("disagreeTextBtn") disagreeTextBtn: ElementRef;
  knowMoreTypeClass = KnowMoreLinkType;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    private _globalService: GlobalService
  ) {
  }

  ngOnInit(): void {
    if (this.data?.title) {
      this.title = this.data.title;
    }
    if (this.data?.agreeText) {
      this.agreeText = this.data.agreeText;
    }
    if (this.data?.disagreeText) {
      this.disagreeText = this.data.disagreeText;
    }
    if (this.data?.confirmDialogContentType) {
      this.confirmDialogContentType = this.data.confirmDialogContentType;
    }
    this.mobileView = this._globalService.isMobileView();
  }

  action(result: boolean) {
    this.dialogRef.close({ data: result });
  }

  mousedown(result) {
    let classNameToAdd = "active";
    let affectedElement;
    let restElement;
    if (result) {
      affectedElement = this.agreeTextBtn.nativeElement;
      restElement = this.disagreeTextBtn.nativeElement;
    } else {
      affectedElement = this.disagreeTextBtn.nativeElement;
      restElement = this.agreeTextBtn.nativeElement;
    }
    let arr = affectedElement.className.split(" ");
    if (arr.indexOf(classNameToAdd) == -1) {
      affectedElement.className += " " + classNameToAdd;
    }
    restElement.classList.remove(classNameToAdd);
  }

  clickEventListener() {
    this.dialogRef.close();
  }
}
