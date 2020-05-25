import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'shared/api.service';
import {LoginService} from '../auth/login.service';


@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent {
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
