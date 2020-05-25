import { Component, Input, OnInit } from '@angular/core';
import { UserProfileCardServiceComponent } from '../user-profile-card/user-profile-card-service.component';
import { LoginService } from 'auth/login.service';

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
  constructor(private userFollowersService: UserProfileCardServiceComponent, private loginService: LoginService) { }

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
    const ownerId = this.loginService.getUserProfile().id;
    this.userFollowersService.unfollowMe(ownerId, this.userId).subscribe((res: any) => {
      // console.log(res);
      this.relation = 'none';
    }, error => {
      // console.log(error.error.errorMessage);
    });
  }
}
