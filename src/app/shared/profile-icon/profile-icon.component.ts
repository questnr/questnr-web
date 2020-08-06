import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { AvatarDTO } from 'models/common.model';
import { StaticMediaSrc } from 'shared/constants/static-media-src';

@Component({
  selector: 'app-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.scss']
})
export class ProfileIconComponent implements OnInit {
  @Input() avatar: AvatarDTO;
  @Input() height: number = 25;
  @Input() border: number = 10;
  @Input() sizeRef: string;
  avatarLink: string;
  @Input() alt: string = "image";
  defaultSrc: string = StaticMediaSrc.userFile;
  @Input() isCommunityAvatar: boolean = false;
  @ViewChild('elementOnHTML', { static: false }) elementOnHTML: ElementRef;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
    if (this.sizeRef === "icon" && this.avatar.iconLink) {
      this.avatarLink = this.avatar.iconLink;
    } else if (this.sizeRef === "small" && this.avatar.smallLink) {
      this.avatarLink = this.avatar.smallLink;
    } else if (this.sizeRef === "medium" && this.avatar.mediumLink) {
      this.avatarLink = this.avatar.mediumLink;
    } else {
      this.avatarLink = this.avatar.avatarLink;
    }
    if (this.isCommunityAvatar) {
      this.defaultSrc = StaticMediaSrc.communityFile;
    }
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.elementOnHTML.nativeElement, 'height', this.height + "px");
    this.renderer.setStyle(this.elementOnHTML.nativeElement, 'width', this.height + "px");
  }
  checkImageSrc(src) {
    if (src) {
      return src;
    } else {
      return this.defaultSrc;
    }
  }
}
