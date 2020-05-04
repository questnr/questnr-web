import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'auth/login.service';
import { ApiService } from 'shared/api.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent {

  @Output() menuToggle = new EventEmitter();
  user: string;
  isLoading = false;
  profile;
  profileImg;
  hashtagInput = new FormControl();
  hashtags = [];

  constructor(private router: Router, public auth: LoginService, private api: ApiService) {
    this.profile = this.auth.getUserProfile();
    this.auth.getUser().subscribe(
      (res) => {
        this.profileImg = res.avatarLink;
      }
    );
    this.hashtagInput.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.hashtags = [];
        }),
        distinctUntilChanged(),
      )
      .subscribe((val) => {
        if (val) {
          this.isLoading = true;
          this.searchHashtag();
        }
      });
    this.api.getNotifications().subscribe(
      res => {
        console.log(res);
      }
    );
  }
  toggleMenu() {
    this.menuToggle.emit();
  }
  searchHashtag() {
    this.api.searchHashtag(this.hashtagInput.value).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.hashtags = res;
      }
    );
  }
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
