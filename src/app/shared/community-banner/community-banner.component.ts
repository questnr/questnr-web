import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AvatarDTO } from 'models/common.model';
import { GlobalConstants } from 'shared/constants';
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
  globalConstantsClass = GlobalConstants;

  constructor(private renderer: Renderer2,
    private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    if (this.optimise) {
      this.showTemporaryImage = true;
    }
    // this.renderer.setStyle(this.imageOnHTML.nativeElement, 'height', this.height + "px");
    // this.renderer.setStyle(this.imageOnHTML.nativeElement, 'min-height', this.height + "px");
  }

  getTemporaryCommunityBanner() {
    this.renderer.setStyle(this.imageOnHTML.nativeElement, 'visibility', 'hidden');
    this.renderer.setStyle(this.imageOnHTML.nativeElement, 'height', '0');
    if (this.avatar.smallLink) {
      return this.avatar.smallLink;
    }
    return StaticMediaSrc.communityFile;
  }

  getCommunityBanner() {
    if (!this.avatarLink) {
      if (this.sizeRef === "icon" && this.avatar.iconLink) {
        this.avatarLink = this.avatar.iconLink;
      } else if (this.sizeRef === "small" && this.avatar.smallLink) {
        this.avatarLink = this.avatar.smallLink;
      } else if (this.sizeRef === "medium" && this.avatar.mediumLink) {
        this.avatarLink = this.avatar.mediumLink;
      } else if (this.avatar.avatarLink) {
        this.avatarLink = this.avatar.avatarLink;
      } else {
        this.avatarLink = StaticMediaSrc.communityFile;
      }
      this.cd.detach();
      return this.avatarLink;
    }
    return this.avatarLink;
  }

  onError() {
  }

  onLoad() {
    this.isBannerLoding = false;
    if (this.optimise) {
      this.renderer.setStyle(this.imageOnHTML.nativeElement, 'visibility', 'visible');
      this.renderer.setStyle(this.imageOnHTML.nativeElement, 'height', 'unset');
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
