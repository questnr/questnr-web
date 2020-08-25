import { Component, OnInit, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  innerHtml: string;
  @ViewChild("agreeTextBtn") agreeTextBtn: ElementRef;
  @ViewChild("disagreeTextBtn") disagreeTextBtn: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      agreeText: string,
      disagreeText: string,
      mobileView: boolean,
      innerHTML: string
    },
  ) { }

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
    if (this.data?.mobileView) {
      this.mobileView = this.data.mobileView;
    }
    if (this.data?.innerHTML) {
      this.innerHtml = this.data.innerHTML;
    }
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
}
