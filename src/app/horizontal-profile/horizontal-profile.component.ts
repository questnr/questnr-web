import { Component, Input, OnInit } from '@angular/core';
import { AvatarDTO } from '../models/common.model';
import { StaticMediaSrc } from '../shared/constants/static-media-src';

@Component({
  selector: 'app-horizontal-profile',
  templateUrl: './horizontal-profile.component.html',
  styleUrls: ['./horizontal-profile.component.scss']
})
export class HorizontalProfileComponent implements OnInit {
  @Input() avatar: AvatarDTO;
  @Input() isCommunityAvatar: boolean = false;
  @Input() head: string;
  @Input() subhead: string;
  defaultUserSrc: string = StaticMediaSrc.userFile;

  constructor() { }

  ngOnInit(): void {
  }

}
