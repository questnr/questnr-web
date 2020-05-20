import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { LoginService } from 'auth/login.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomValidations {

  static MatchPassword(ac: AbstractControl) {
    const password = ac.get('password').value; // to get value in input tag
    const confirmPassword = ac.get('confirmPassword').value; // to get value in input tag
    if (password !== confirmPassword) {
      ac.get('confirmPassword').setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }
}
export class AsyncValidator {
  static checkUsernameExists(auth: LoginService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return auth.checkUsernameExists(control.value).pipe(map((resp: any) => {
        return null;
      }), catchError((err: HttpErrorResponse) => {
        if (err && err.error) {
          return of({ exists: true });
        } else {
          return of(null);
        }
      }));
    }
  }
  static checkEmailExists(auth: LoginService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return auth.checkEmailExists(control.value).pipe(map((resp: any) => {
        return null;
      }), catchError((err: HttpErrorResponse) => {
        if (err && err.error) {
          return of({ exists: true });
        } else {
          return of(null);
        }
      }));
    }
  }
}
