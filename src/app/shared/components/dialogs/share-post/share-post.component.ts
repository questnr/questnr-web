import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-share-post',
  templateUrl: './share-post.component.html',
  styleUrls: ['./share-post.component.scss']
})
export class SharePostComponent {
  url: string;
  isCopied = false;
  constructor(
    public dialogRef: MatDialogRef<SharePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.url = data.url;
  }

  showCopied(event) {
    this.isCopied = true;
  }
}
