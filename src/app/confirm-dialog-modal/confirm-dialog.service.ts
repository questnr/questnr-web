import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from 'common/snackbar.service';
import { CommunityMembersService } from 'community-users/community-members.service';
import { GlobalService } from 'global.service';
import { Community, CommunityProfileMeta } from 'models/community.model';
import { ActionType } from 'models/snackbar.model';
import { User } from 'models/user.model';
import { Subject } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  private config: any;
  private dialogRef: MatDialogRef<ConfirmDialogComponent>;
  private mobileView: boolean = false;

  constructor(private dialog: MatDialog,
    private _globalService: GlobalService,
    private snackBarService: SnackBarService,
    private communityMembersService: CommunityMembersService) {
    this.mobileView = this._globalService.isMobileView();
    if (this.mobileView) {
      this.config = {
        maxWidth: '95vw',
        width: '100%',
        data: null
      };
    } else {
      this.config = {
        width: '550px',
        maxWidth: '80vw',
        data: null
      };
    }
  }

  openRemoveMemberConfirmDialog(processingData: { user: User, community: Community }): Subject<any> {
    let closeSubject = new Subject<any>();

    this.config.data = {
      title: `Do you want to remove ${processingData.user.username} ?`,
      agreeText: "Remove",
      disagreeText: "Cancel"
    };

    this.dialogRef = this.dialog.open(ConfirmDialogComponent, this.config);

    this.dialogRef.afterClosed().subscribe(result => {
      if (result?.data) {
        this.communityMembersService
          .removeUserFromCommunity(processingData.community.communityId, processingData.user.userId)
          .subscribe((communityProfileMeta: CommunityProfileMeta) => {
            result.communityProfileMeta = communityProfileMeta;
            closeSubject.next(result);
            this.snackBarService.showSnackBar({
              message: `Removed ${processingData.user.username}`,
              actionType: ActionType.close,
            });
          }, (error) => {
            if (error.error.errorMessage)
              this.snackBarService.showSnackBar({ message: error.error.errorMessage });
          });
      } else {
        closeSubject.next(result);
      }
    });

    return closeSubject;
  }

  close(): void {
    this.dialogRef.close();
  }
}
