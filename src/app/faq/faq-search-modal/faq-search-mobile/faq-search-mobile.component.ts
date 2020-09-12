import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-faq-search-mobile',
  templateUrl: './faq-search-mobile.component.html',
  styleUrls: ['./faq-search-mobile.component.scss']
})
export class FAQSearchMobileComponent implements OnInit {
  queryString: string

  constructor(@Inject(MAT_DIALOG_DATA) public data: { queryString: string },
    public dialogRef: MatDialogRef<FAQSearchMobileComponent>,) {
    this.queryString = this.data.queryString;
  }

  ngOnInit(): void {
  }

  closeEventListener($event) {
    this.dialogRef.close();
  }
}
