import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { AvatarDTO } from 'models/common.model';

@Component({
  selector: 'app-community-banner',
  templateUrl: './community-banner.component.html',
  styleUrls: ['./community-banner.component.scss']
})
export class CommunityBannerComponent implements OnInit {
  @Input() avatar: AvatarDTO;
  @Input() height: number = 100;
  @Input() sizeRef: string;
  avatarLink: string;
  @Input() alt: string = "image";
  @ViewChild('imageOnHTML', { static: false }) imageOnHTML: ElementRef;

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
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.imageOnHTML.nativeElement, 'height', this.height + "px");
    this.renderer.setStyle(this.imageOnHTML.nativeElement, 'min-height', this.height + "px");
  }
  checkImageSrc(src) {
    if (src) {
      return src;
    } else {
      return '/assets/default.jpg';
    }
  }
}
