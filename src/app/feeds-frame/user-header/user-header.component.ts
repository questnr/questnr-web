import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'auth/login.service';

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

  constructor(private router: Router, public auth: LoginService) {
    this.profile = this.auth.getUserProfile();
    this.auth.getUser().subscribe(
      (res) => {
        console.log(res);
        this.profileImg = res.body;
      }
    );
  }


  toggleMenu() {
    this.menuToggle.emit();
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
