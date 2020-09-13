import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalService } from 'global.service';
import { GlobalConstants } from 'shared/constants';

@Component({
  selector: 'app-sign-in-required',
  templateUrl: './sign-in-required.component.html',
  styleUrls: ['./sign-in-required.component.scss']
})
export class SignInRequiredComponent implements OnInit {
  mobileView: boolean = false;
  content: string;

  constructor(private _globalService: GlobalService,
    @Inject(MAT_DIALOG_DATA) public data: { content: string },
    public dialogRef: MatDialogRef<SignInRequiredComponent>,
    private router: Router) {
    this.content = this.data.content;
  }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

  redirectToSignInPage() {
    this.router.navigate(['/', GlobalConstants.login])
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
