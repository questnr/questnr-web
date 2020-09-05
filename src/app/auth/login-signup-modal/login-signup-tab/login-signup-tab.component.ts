import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'global.service';
import { LoginSignUpComponentType } from 'models/login.model';

@Component({
  selector: 'app-login-signup-tab',
  templateUrl: './login-signup-tab.component.html',
  styleUrls: ['./login-signup-tab.component.scss']
})
export class LoginSignupTabComponent implements OnInit {
  title: string;
  publicEntityId: number;
  loginSignupComponentType: LoginSignUpComponentType = LoginSignUpComponentType.modal;

  constructor(private _globalService: GlobalService,
    private dialogRef: MatDialogRef<LoginSignupTabComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      publicEntityId: number
    }) { }

  ngOnInit(): void {
    if (this.data.title) {
      this.title = this.data.title;
    }
    if (this.data.publicEntityId) {
      this.publicEntityId = this.data.publicEntityId;
    }
  }

  closeModalListener() {
    this.dialogRef.close();
  }
}
