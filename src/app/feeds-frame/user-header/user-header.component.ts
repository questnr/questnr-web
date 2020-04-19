import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent {

  @Output() menuToggle = new EventEmitter();

  constructor(private router: Router) { }

  toggleMenu() {
    this.menuToggle.emit();
  }
  openDialog() {

  }
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('auth/login');
  }
}
