import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'auth/login.service';
import { CommunityService } from 'community/community.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-community-relation-action-button',
  templateUrl: './community-relation-action-button.component.html',
  styleUrls: ['./community-relation-action-button.component.scss']
})
export class CommunityRelationActionButtonComponent implements OnInit {
  @Input() relation: string;
  @Input() communityId: number;
  @Output() actionEvent = new EventEmitter();
  constructor(private auth: CommunityService,
    private loginAuth: LoginService,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  followThisCommunty() {
    this.auth.followCommunity(this.communityId).subscribe((res: any) => {
      this.relation = 'followed';
      this.sendAction(this.relation);
    }, error => {
      // console.log('failed to join this community', error.error.errorMessage);
      this.snackBar.open(error.error.errorMessage, 'close', { duration: 3000 });
    });
  }

  unfollowThisCommunity() {
    const userId = this.loginAuth.getUserProfile().id;
    this.auth.unfollowCommunityService(this.communityId, userId).subscribe((res: any) => {
      this.relation = '';
      this.sendAction(this.relation);
    }, error => {
      // console.log('failed to unfollow' + this.communityDTO.communityName, error.error.errorMessage);
    });
  }

  sendAction(hasFollowed) {
    this.actionEvent.emit(hasFollowed);
  }
}
