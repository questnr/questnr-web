import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'shared/api.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent {

  constructor(private router: Router, private api: ApiService) { }

  goTo(val) {
    this.api.activeAuth = val;
    this.router.navigate(['/']);
  }

}
