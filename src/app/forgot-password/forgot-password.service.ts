import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ForgotPasswordService {
    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {
    }

    sendResetLink(email: string) {
        return this.http.post(this.baseUrl + 'forgot-password', { email });
    }
}