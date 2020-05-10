import {Component, Input, OnInit} from '@angular/core';
import {UserProfileCardServiceComponent} from './user-profile-card-service.component';
@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.scss']
})
export class UserProfileCardComponent implements OnInit {
  @Input() avatarLink = 'assets/default.jpg';
  @Input() username;
  @Input() slug;
  @Input() relationship;
  @Input() userId;
  followed: any;
  owner = false;
  // @Input() followers;
  constructor( public auth: UserProfileCardServiceComponent) { }

  ngOnInit(): void {
    if (this.avatarLink == null) {
      this.avatarLink = 'assets/default.jpg';
    }
    if (this.relationship === 'owned') {
      this.owner = true;
    }
  }

  addUser() {
    this.followed = this.auth.followMe(this.userId);
  }
}
