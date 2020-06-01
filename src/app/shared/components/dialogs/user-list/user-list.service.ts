import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(public http: HttpClient) { }
  baseUrl = environment.baseUrl;

  searchUser(userString: string) {
    if (!userString) return of();
    return this.http.get(this.baseUrl + 'user/search/users?userString=' + userString);
  }

}
