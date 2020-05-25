import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'shared/api.service';


@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent {

  constructor(private router: Router, private api: ApiService) { }

  goTo(val) {
    this.api.activeAuth = val;
    this.router.navigate(['/']);
  }

}
