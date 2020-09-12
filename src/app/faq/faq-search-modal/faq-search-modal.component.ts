import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from 'global.service';
import { FAQSearchMobileComponent } from './faq-search-mobile/faq-search-mobile.component';

@Component({
  selector: 'app-faq-search-modal',
  templateUrl: './faq-search-modal.component.html',
  styleUrls: ['./faq-search-modal.component.scss']
})
export class FAQSearchModalComponent implements OnInit {
  dialogRef: MatDialogRef<FAQSearchMobileComponent>;
  mobileView: boolean = false;

  constructor(private dialog: MatDialog,
    private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

  open(queryString: string = ""): void {
    let config = null;

    if (this.mobileView) {
      config = {
        position: {
          top: '20%'
        },
        maxHeight: '60%',
        borderRadius: '0px',
        width: '95vw',
        marginTop: '0px',
        marginRight: '0px !important',
        panelClass: 'faq-search-modal',
        overflow: "hidden",
        data: { queryString }
      };
    } else {
      config = {
        // width: '500px',
        // data: userList,
        maxHeight: '70vh',
        maxWidth: "80vw",
        panelClass: 'faq-search-modal',
        overflow: "hidden",
        data: { queryString }
      };
    }
    this.dialogRef = this.dialog.open(FAQSearchMobileComponent, config);

    this.dialogRef.afterClosed().subscribe(result => {

    });
  }

  close(): void {
    if (this.dialogRef)
      this.dialogRef.close();
  }

}
