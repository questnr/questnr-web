import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'auth/login.service';
import { ApiService } from 'shared/api.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent {

  @Output() menuToggle = new EventEmitter();
  user: string;
  profile;
  profileImg;
  hashtagInput = new FormControl();
  hashtags = [];

  constructor(private router: Router, public auth: LoginService, private api: ApiService) {
    this.profile = this.auth.getUserProfile();
    // this.profileImg = this.auth.getUserProfileIcon
    this.auth.getUser().subscribe(
      (res) => {
        this.profileImg = res.avatarLink;
      }
    );
  }
  toggleMenu() {
    this.menuToggle.emit();
  }
  searchHashtag() {
    this.api.searchHashtag(this.hashtagInput.value).subscribe(
      res => {
        console.log(res);
      }
    );
  }
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
