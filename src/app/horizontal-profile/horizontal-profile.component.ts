import { Component, OnInit, Input } from '@angular/core';
import { StaticMediaSrc } from 'shared/constants/static-media-src';

@Component({
  selector: 'app-horizontal-profile',
  templateUrl: './horizontal-profile.component.html',
  styleUrls: ['./horizontal-profile.component.scss']
})
export class HorizontalProfileComponent implements OnInit {
  @Input() avatarLink: string;
  @Input() head: string;
  @Input() subhead: string;
  defaultUserSrc: string = StaticMediaSrc.userFile;

  constructor() { }

  ngOnInit(): void {
  }

}
