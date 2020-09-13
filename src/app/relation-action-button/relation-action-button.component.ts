import { Component, Input, OnInit } from '@angular/core';
import { UserProfileCardServiceComponent } from '../user-profile-card/user-profile-card-service.component';
import { LoginService } from 'auth/login.service';
import { ConfirmDialogComponent } from 'confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-relation-action-button',
  templateUrl: './relation-action-button.component.html',
  styleUrls: ['./relation-action-button.component.scss']
})
export class RelationActionButtonComponent implements OnInit {
  @Input() relation: string;
  @Input() userId: number;
  @Input() mobileView: boolean = false;
  @Input() primary: boolean = true;
  @Input() size: string = "large";
  @Input() username: string;
  constructor(private userFollowersService: UserProfileCardServiceComponent,
    private loginService: LoginService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  follow() {
    this.userFollowersService.followMe(this.userId).subscribe((res: any) => {
      // console.log(res);
      this.relation = 'followed';
    }, error => {
      // console.log(error.error.errorMessage);
    });
  }
  unfollow() {
    let title = "Do you want to unfollow " + this.username + "?";
    let dialogConfig;
    if (this.mobileView) {
      dialogConfig = {
        maxWidth: '100vw',
        width: '100%',
        data: {
          title,
          mobileView: this.mobileView
        }
      }
    } else {
      dialogConfig = {
        width: '550px',
        maxWidth: '80vw',
        data: {
          title,
          mobileView: this.mobileView
        }
      }
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result?.data == true) {
        const snackBarRef = this.snackBar.open('Unfollowing...');
        const ownerId = this.loginService.getLocalUserProfile().id;
        this.userFollowersService.unfollowMe(ownerId, this.userId).subscribe((res: any) => {
          // console.log(res);
          this.relation = 'none';
          this.snackBar.open("Unfollowed " + this.username, 'close', { duration: 3000 });
        }, error => {
          snackBarRef.dismiss();
          this.snackBar.open(error.error.errorMessage, 'close', { duration: 3000 });
        });
      }
    });
  }
}
