import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { CommunityService } from '../community/community.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog-modal/confirm-dialog/confirm-dialog.component';
import { CommunityPrivacy } from '../models/community.model';
import { RelationType } from '../models/relation-type';
@Component({
  selector: 'app-community-relation-action-button',
  templateUrl: './community-relation-action-button.component.html',
  styleUrls: ['./community-relation-action-button.component.scss']
})
export class CommunityRelationActionButtonComponent implements OnInit {
  @Input() relation: RelationType;
  @Input() communityId: number;
  @Input() communityName: string;
  @Input() mobileView: boolean = false;
  @Input() communityType: string;
  @Output() actionEvent = new EventEmitter();
  CommunityPrivacy = CommunityPrivacy;

  constructor(private auth: CommunityService,
    private loginAuth: LoginService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  followThisCommunty() {
    this.auth.followCommunity(this.communityId).subscribe((res: any) => {
      this.relation = res.relationShipType;
      this.sendAction(this.relation);
    }, error => {
      // console.log('failed to join this community', error.error.errorMessage);
      this.snackBar.open(error.error.errorMessage, 'close', { duration: 3000 });
    });
  }

  unfollowThisCommunity() {
    let title = "Do you want to unfollow " + this.communityName + "?";
    let dialogConfig;
    if (this.mobileView) {
      dialogConfig = {
        maxWidth: '95vw',
        width: '100%',
        data: {
          title,
          mobileView: this.mobileView
        }
      };
    } else {
      dialogConfig = {
        width: '550px',
        maxWidth: '80vw',
        data: {
          title,
          mobileView: this.mobileView
        }
      };
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result?.data) {
        const snackBarRef = this.snackBar.open('Unfollowing...');
        const userId = this.loginAuth.getLocalUserProfile().id;
        this.auth.unfollowCommunityService(this.communityId, userId).subscribe((res: any) => {
          this.relation = RelationType.NONE;
          this.sendAction(this.relation);
          this.snackBar.open("Unfollowed " + this.communityName, 'close', { duration: 3000 });
        }, error => {
          snackBarRef.dismiss();
          this.snackBar.open(error.error.errorMessage, 'close', { duration: 3000 });
        });
      }
    });
  }

  sendAction(relation: RelationType) {
    this.actionEvent.emit(relation);
  }
  deleteUsersOwnPendingCommunityJoinRequests() {
    this.auth.deleteUsersOwnPendingCommunityJoinRequests(this.communityId).subscribe((res: any) => {
      this.relation = RelationType.NONE;
      this.snackBar.open('Request cancelled', 'close', { duration: 3000 });
    }, error => {
      this.snackBar.open(error.error.errorMessage, 'close', { duration: 3000 });
    });
  }
}
