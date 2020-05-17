import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-horizontal-profile',
  templateUrl: './horizontal-profile.component.html',
  styleUrls: ['./horizontal-profile.component.scss']
})
export class HorizontalProfileComponent implements OnInit {
  @Input() avatarLink: string;
  @Input() head: string;
  @Input() subhead: string;

  constructor() { }

  ngOnInit(): void {
  }

}
