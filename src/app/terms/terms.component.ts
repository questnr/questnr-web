import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'shared/api.service';
import { LoginService } from '../auth/login.service';

@Component({
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  loggedIn = false;
  constructor(private router: Router, private api: ApiService, public loginService: LoginService) { }

  goTo(val) {
    this.api.activeAuth = val;
    this.router.navigate(['/']);
  }
  ngOnInit() {
    if (this.loginService.getUserProfile()) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }
}
