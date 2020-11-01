import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AvatarDTO } from 'models/common.model';
import { AWSService } from 'service/aws.service';
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
  signedURL: string;

  constructor(private renderer: Renderer2,
    private awsService: AWSService,
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
    if (this.avatar.smallKey) {
      return this.awsService.getObjectURL(this.avatar.smallKey);
    }
    return StaticMediaSrc.communityFile;
  }

  getCommunityBanner() {
    if (!this.signedURL) {
      if (this.sizeRef === "icon" && this.avatar.iconKey) {
        this.signedURL = this.awsService.getObjectURL(this.avatar.iconKey);
      } else if (this.sizeRef === "small" && this.avatar.smallKey) {
        this.signedURL = this.awsService.getObjectURL(this.avatar.smallKey);
      } else if (this.sizeRef === "medium" && this.avatar.mediumKey) {
        this.signedURL = this.awsService.getObjectURL(this.avatar.mediumKey);
      } else if (this.avatar.avatarKey) {
        this.signedURL = this.awsService.getObjectURL(this.avatar.avatarKey);
      } else {
        this.signedURL = StaticMediaSrc.communityFile;
      }
      this.cd.detach();
      return this.signedURL;
    }
    return this.signedURL;
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
