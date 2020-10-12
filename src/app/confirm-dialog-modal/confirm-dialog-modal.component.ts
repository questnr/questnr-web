import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from 'global.service';
import { ConfirmDialogData } from 'models/confirm-dialog.model';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-confirm-dialog-modal',
  templateUrl: './confirm-dialog-modal.component.html',
  styleUrls: ['./confirm-dialog-modal.component.scss']
})
export class ConfirmDialogModalComponent implements OnInit {
  dialogRef: MatDialogRef<ConfirmDialogComponent>;
  mobileView: boolean = false;
  @Output() closeAction = new EventEmitter();

  constructor(private dialog: MatDialog,
    private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

  open(modalData: ConfirmDialogData): void {
    let dialogConfig;
    if (this.mobileView) {
      dialogConfig = {
        maxWidth: '100vw',
        width: '100%',
        data: modalData
      };
    } else {
      dialogConfig = {
        width: '550px',
        maxWidth: '80vw',
        data: modalData
      };
    }
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      this.closeAction.emit(result);
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
