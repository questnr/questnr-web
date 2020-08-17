import { Component, OnInit, Inject } from '@angular/core';
import { GlobalService } from 'global.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login-signup-tab',
  templateUrl: './login-signup-tab.component.html',
  styleUrls: ['./login-signup-tab.component.scss']
})
export class LoginSignupTabComponent implements OnInit {
  title: string;

  constructor(private _globalService: GlobalService,
    private dialogRef: MatDialogRef<LoginSignupTabComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string
    }) { }

  ngOnInit(): void {
    if (this.data.title) {
      this.title = this.data.title;
    }
  }

  closeModalListener() {
    this.dialogRef.close();
  }
}
