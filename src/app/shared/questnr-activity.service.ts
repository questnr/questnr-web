import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserActivity, TrackingEntityType, TrackingInstance } from 'models/user-activity.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestnrActivityService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  /**
   * Activity Starts
   */
  private activityFunc(trackFunc: Function, entityId: number, trackingId: number) {
    try {
      trackFunc({
        entityId: entityId,
        trackingId: trackingId,
        updateRequest: true
      }).subscribe();
    } catch (e) {

    }
  }

  start(entityId: number, entityType: TrackingEntityType): Promise<TrackingInstance> {
    if (!entityId || !entityType) return Promise.resolve(new TrackingInstance());
    let trackFunc;
    let trackingId;
    let activityInterval;

    if (entityType === TrackingEntityType.post) {
      trackFunc = this.postPage;
    } else if (entityType === TrackingEntityType.community) {
      trackFunc = this.communityPage;
    } else if (entityType === TrackingEntityType.user) {
      trackFunc = this.userPage;
    }
    trackFunc = trackFunc.bind(this);
    return new Promise((resolve) => {
      trackFunc({
        entityId: entityId,
        trackingId: null,
        updateRequest: false
      }).subscribe((userActivity: UserActivity) => {
        activityInterval = setInterval(() => {
          if (userActivity?.trackingId) {
            trackingId = userActivity?.trackingId;
            this.activityFunc(trackFunc, entityId, trackingId);
          } else {
            clearInterval(activityInterval);
          }
        }, 7000);
        let trackingInstance = new TrackingInstance();
        trackingInstance.activityInterval = activityInterval;
        trackingInstance.destroy = function () {
          clearInterval(this.activityInterval);
        }
        resolve(trackingInstance);
      });
    });
  }
  /**
   * Activity Ends
   */

  private postPage(userActivity: UserActivity) {
    return this.http.post(this.baseUrl + 'activity/post', { ...userActivity });
  }

  private communityPage(userActivity: UserActivity) {
    return this.http.post(this.baseUrl + 'activity/community', { ...userActivity });
  }

  private userPage(userActivity: UserActivity) {
    return this.http.post(this.baseUrl + 'activity/user', { ...userActivity });
  }
}
