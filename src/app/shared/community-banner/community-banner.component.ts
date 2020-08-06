import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { AvatarDTO } from 'models/common.model';
import { StaticMediaSrc } from 'shared/constants/static-media-src';

@Component({
  selector: 'app-community-banner',
  templateUrl: './community-banner.component.html',
  styleUrls: ['./community-banner.component.scss']
})
export class CommunityBannerComponent implements OnInit {
  @Input() avatar: AvatarDTO;
  // @Input() height: number = 100;
  @Input() sizeRef: string;
  @Input() optimise: boolean;
  avatarLink: string;
  @Input() alt: string = "image";
  @ViewChild('imageOnHTML', { static: false }) imageOnHTML: ElementRef;
  isBannerLoding: boolean = true;
  showTemporaryImage: boolean = false;
  tempAvatarLink: string;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    if (this.optimise && this.avatar.mediumLink) {
      this.showTemporaryImage = true;
      this.renderer.setStyle(this.imageOnHTML.nativeElement, 'visibility', 'hidden');
      this.tempAvatarLink = this.avatar.mediumLink;
    }
    if (!this.avatar.mediumLink) {
      this.avatarLink = StaticMediaSrc.communityFile;
    } else {
      if (this.sizeRef === "icon" && this.avatar.iconLink) {
        this.avatarLink = this.avatar.iconLink;
      } else if (this.sizeRef === "small" && this.avatar.smallLink) {
        this.avatarLink = this.avatar.smallLink;
      } else if (this.sizeRef === "medium" && this.avatar.mediumLink) {
        this.avatarLink = this.avatar.mediumLink;
      } else {
        this.avatarLink = this.avatar.avatarLink;
      }
    }
    // this.renderer.setStyle(this.imageOnHTML.nativeElement, 'height', this.height + "px");
    // this.renderer.setStyle(this.imageOnHTML.nativeElement, 'min-height', this.height + "px");
  }

  onError() {
  }

  onLoad() {
    this.isBannerLoding = false;
    if (this.optimise) {
      this.renderer.setStyle(this.imageOnHTML.nativeElement, 'visibility', 'visible');
      this.showTemporaryImage = false;
    }
  }
  checkImageSrc(src) {
    if (src) {
      return src;
    } else {
      return StaticMediaSrc.communityFile;
    }
  }
}
