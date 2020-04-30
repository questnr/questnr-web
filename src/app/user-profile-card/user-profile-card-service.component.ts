import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserProfileCardServiceComponent {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  followMe(id) {
    this.http.post<any>(this.baseUrl + 'user/follow/user/' + id , '').subscribe( (res: any) => {
      return true;
    }, error => {
      return false;
    });
  }
}
