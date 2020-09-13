import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginSignupTabComponent } from './login-signup-tab/login-signup-tab.component';
import { GlobalService } from 'global.service';

@Component({
  selector: 'login-signup-modal',
  templateUrl: './login-signup-modal.component.html',
  styleUrls: ['./login-signup-modal.component.scss']
})
export class LoginSignupModalComponent implements OnInit {
  @Input() publicEntityId: number;
  dialogRef: MatDialogRef<LoginSignupTabComponent>;
  isOpen: boolean = false;

  constructor(private dialog: MatDialog, private _globalService: GlobalService) { }

  ngOnInit(): void {
  }

  open(title = undefined) {
    this.isOpen = true;
    this.dialogRef = this.dialog.open(LoginSignupTabComponent, {
      width: this._globalService.isMobileView() ? "90vw" : "50vw",
      maxWidth: "450px",
      data: {
        title: title,
        publicEntityId: this.publicEntityId
      }
    });
    this.dialogRef.afterClosed().subscribe(() => {
      this.isOpen = false;
    });
  }

  close() {
    this.dialogRef.close();
  }
}
