import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SinglePost } from 'models/signle-post.model';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InviteUsetService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getInviteUserList(communityId, page) {
        if (!communityId) return of();
        return this.http.get(this.baseUrl + `user/join/community/${communityId}/users`, { params: { page } });
    }

    inviteUser(communityId, userId) {
        if (!communityId || !userId) return of();
        return this.http.post(this.baseUrl + `user/join/community/${communityId}/invite`, { userId });
    }
}
