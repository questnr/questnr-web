import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'global.service';
import { CommunityListType } from 'models/community.model';

@Component({
  selector: 'app-no-community',
  templateUrl: './no-community.component.html',
  styleUrls: ['./no-community.component.scss']
})
export class NoCommunityComponent implements OnInit {
  @Input() communityListType: CommunityListType;
  communityListTypeClass = CommunityListType;
  @Input() isOwner: boolean = false;
  mobileView: boolean = false;

  constructor(private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }
}
