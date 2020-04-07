import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: LoginService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      localStorage.clear();
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
