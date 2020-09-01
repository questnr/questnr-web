import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Community, CommunityPublic, CommunityPrivacy, CommunityRequestActionType, CommunityProfileMeta } from '../models/community.model';
import { Observable, of } from 'rxjs';
import { MetaTagCard } from 'models/common.model';
import { RelationType } from 'models/relation-type';

@Injectable({
  providedIn: 'root'
})

export class CommunityService {

  baseUrl = environment.baseUrl;


  constructor(private http: HttpClient) {
  }

  isAllowedIntoCommunity(community: Community): boolean {
    return this.isAllowedIntoCommunityWithRelationType(community.communityPrivacy, community.communityMeta.relationShipType);
  }

  isAllowedIntoCommunityWithRelationType(communityPrivacy: CommunityPrivacy, relationShipType: RelationType): boolean {
    if (communityPrivacy === CommunityPrivacy.pri &&
      (relationShipType === RelationType.OWNED ||
        relationShipType === RelationType.FOLLOWED)) {
      return true;
    }
    if (communityPrivacy == CommunityPrivacy.pub) {
      return true;
    }
    return false;
  }

  getCommunityDetails(slug): Observable<CommunityPublic> {
    if (!slug) {
      return of();
    }
    return this.http.get<CommunityPublic>(this.baseUrl + 'community/' + slug);
  }

  getCommunityUserList(slug) {
    if (!slug) {
      return of();
    }
    return this.http.get(this.baseUrl + 'user/community/' + slug + '/users');
  }

  getCommunityFeeds(id, page) {
    if (!id) {
      return of();
    }
    return this.http.get(this.baseUrl + 'user/community/' + id + '/posts', { params: { page } });
  }

  updateCommunityAvatar(formData, comId) {
    if (!comId) {
      return of();
    }
    return this.http.post(this.baseUrl + 'user/community/' + comId + '/avatar', formData);
  }

  followCommunity(id) {
    if (!id) {
      return of();
    }
    return this.http.post(this.baseUrl + 'user/join/community/' + id, '');
  }

  unfollowCommunityService(communityId, userId) {
    if (!communityId || !userId) {
      of();
    }
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: { userId }
    };
    if (!communityId) {
      return of();
    }
    return this.http.delete(this.baseUrl + 'user/join/community/' + communityId, httpOptions);
  }

  getCommunityMetaCard(communitySlug: string): Observable<MetaTagCard> {
    if (!communitySlug) {
      return of();
    }
    return this.http.get<MetaTagCard>(this.baseUrl + 'community/meta-information/' + communitySlug);
  }

  getSharableLink(communityId) {
    if (!communityId) {
      return of();
    }
    return this.http.get(this.baseUrl + `user/community/${communityId}/link`, {});
  }

  getCommunityJoinRequests(communityId, page) {
    if (!communityId) {
      return of();
    }
    return this.http.get(this.baseUrl + 'user/community/' + communityId + '/users/request', { params: { page } });
  }

  joinRequestResponse(communityId, userId, requestType: CommunityRequestActionType) {
    if (!communityId || !userId) {
      return of();
    }
    if (requestType === CommunityRequestActionType.accept) {
      return this.http.post(this.baseUrl + `user/community/${communityId}/users/${userId}/request`, {});
    }
    if (requestType === CommunityRequestActionType.reject) {
      return this.http.delete(this.baseUrl + `user/community/${communityId}/users/${userId}/request`);
    }
  }

  toggleCommunityPrivacy(communityId, communityPrivacy: CommunityPrivacy) {
    if (!communityPrivacy || !communityId) {
      return of();
    }
    return this.http.put(this.baseUrl + `user/community/${communityId}/privacy`, { communityPrivacy });
  }
  deleteUsersOwnPendingCommunityJoinRequests(communityId) {
    if (!communityId) {
      of();
    }
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {}
    };
    return this.http.delete(this.baseUrl + `user/community/${communityId}/users/request`, httpOptions);
  }
  getCommunityDetailsById(communityId) {
    if (!communityId) {
      of();
    }
    return this.http.get(this.baseUrl + `user/community/${communityId}`);
  }

  getCommunityMetaInfoWithParams(communitySlug, params): Observable<CommunityProfileMeta> {
    if (!communitySlug) return of();
    return this.http.get<CommunityProfileMeta>(this.baseUrl + `/community/meta/${communitySlug}/info/params`, { params: { params } });
  }
}

