import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'shared/api.service';
import { LoginService } from '../auth/login.service';
import { GlobalConstants } from 'shared/constants';

@Component({
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})

export class PolicyComponent implements OnInit {
  loggedIn = false;
  cookiePath = GlobalConstants.cookiePath;
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
