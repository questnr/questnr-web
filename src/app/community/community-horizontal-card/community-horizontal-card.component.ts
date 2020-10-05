import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommunityActivityComponent } from 'community-activity/community-activity.component';
import { Community, CommunityActivityPositionType, CommunityProfileMeta } from 'models/community.model';

@Component({
  selector: 'app-community-horizontal-card',
  templateUrl: './community-horizontal-card.component.html',
  styleUrls: ['./community-horizontal-card.component.scss']
})
export class CommunityHorizontalCardComponent implements OnInit {
  community: Community;
  communityInfo: CommunityProfileMeta;
  communityActivityRef: CommunityActivityComponent;
  @ViewChild("communityActivity")
  set communityActivity(communityActivityRef: CommunityActivityComponent) {
    this.communityActivityRef = communityActivityRef;
  }
  communityActivityPositionTypeClass = CommunityActivityPositionType;
  @Output() openCommunityDescriptionEmiiter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  setCommunity(community: Community): void {
    this.community = community;
  }

  setCommunityInfo(communityInfo: CommunityProfileMeta) {
    this.communityInfo = communityInfo;
    this.communityActivityRef.setCommunityInfo(this.communityInfo);
  }

  openCommunityDescription(): void {
    this.openCommunityDescriptionEmiiter.emit();
  }
}
