import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from 'global.service';
import { SignInRequiredComponent } from './sign-in-required/sign-in-required.component';

@Component({
  selector: 'app-sign-in-required-modal',
  templateUrl: './sign-in-required-modal.component.html',
  styleUrls: ['./sign-in-required-modal.component.scss']
})
export class SignInRequiredModalComponent implements OnInit {
  dialogRef: MatDialogRef<SignInRequiredComponent>;
  mobileView: boolean = false;
  isOpen: boolean = false;

  constructor(private dialog: MatDialog,
    private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

  open(content: string, redirectURL: string = undefined): void {
    this.isOpen = true;
    let config = null;
    let data = { content, redirectURL };

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
        panelClass: 'sign-in-required-modal',
        overflow: "hidden",
        data
      };
    } else {
      config = {
        // width: '500px',
        // data: userList,
        maxHeight: '70vh',
        maxWidth: "80vw",
        panelClass: 'sign-in-required-modal',
        overflow: "hidden",
        data
      };
    }
    this.dialogRef = this.dialog.open(SignInRequiredComponent, config);

    this.dialogRef.afterClosed().subscribe(result => {
      this.isOpen = false;
    });
  }

  close(): void {
    this.isOpen = false;
    if (this.dialogRef)
      this.dialogRef.close();
  }
}
