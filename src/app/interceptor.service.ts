import {Injectable, Injector} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry, map} from 'rxjs/operators';
import {LoginService} from './auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  authService = this.injector.get(LoginService);

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  decodeToken() {
    return localStorage.getItem('token');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    let headers = new HttpHeaders();

    const authService = this.injector.get(LoginService);
    const contentType = 'application/json';

    if (req.body instanceof FormData) {
      headers = authService.loggedIn() ?
        headers
          .set('Authorization', 'Bearer ' + this.decodeToken())
          .set('Access-Control-Allow-Origin', '*')
        : headers.set('Access-Control-Allow-Origin', '*');
    } else {
      headers = authService.loggedIn() ?
        headers
          .set('Authorization', 'Bearer ' + this.decodeToken())
          .set('Access-Control-Allow-Origin', '*')
          .set('Content-Type', contentType)
        : headers.set('Content-Type', contentType)
          .set('Access-Control-Allow-Origin', '*');
    }

// <<<<<<< HEAD
    // headers = authService.loggedIn() ?
    //   headers
    //     .set('Authorization', 'Bearer ' + this.decodeToken())
    //     .set('Access-Control-Allow-Origin', '*')
    //     .set('Content-Type', contentType)
    //   : headers.set('Content-Type', contentType)
    //     .set('Access-Control-Allow-Origin', '*');
    // : headers.set('Access-Control-Allow-Origin', '*');
// =======
//     headers = this.authService.loggedIn() ?
//       headers.set('Authorization', 'Bearer ' + this.decodeToken())
//         .set('content-type', contentType)
//       : headers.set('content-type', contentType);
// >>>>>>> master

    const clone = req.clone({
      headers
    });

    return next.handle(clone)
      .pipe(
        map(event => {
          return event;
        }),
        retry(1),
        catchError(this.handleError)
      );
  }
}
