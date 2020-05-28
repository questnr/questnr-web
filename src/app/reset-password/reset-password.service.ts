import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {
    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {
    }

    updatePassword(resetToken: string, password: string) {
        return this.http.post(this.baseUrl + 'update-password', { resetToken, password });
    }
}