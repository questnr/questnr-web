import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

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