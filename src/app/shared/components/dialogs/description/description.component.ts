import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  descriptionText: any;
  background: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit() {
    this.descriptionText = this.data.text;
    this.background = this.data.communityAvatar;
  }

  getImgUrl(src: string) {
    return src ? `url(${src})` : `url("assets/default.jpg")`;
  }
}
