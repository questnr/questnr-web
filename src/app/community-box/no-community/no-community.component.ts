import { Component, Input, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

}
