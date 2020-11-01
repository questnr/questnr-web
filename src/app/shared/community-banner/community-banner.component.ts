import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
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

  constructor(private renderer: Renderer2,
    private awsService: AWSService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    console.log("this.avatar", this.avatar);
    if (this.optimise && this.avatar.mediumKey) {
      this.showTemporaryImage = true;
      this.renderer.setStyle(this.imageOnHTML.nativeElement, 'visibility', 'hidden');
      this.tempAvatarLink = this.awsService.getObjectURL(this.avatar.mediumKey);
    }
    if (!this.avatar.mediumKey) {
      this.avatarLink = StaticMediaSrc.communityFile;
    } else {
      if (this.sizeRef === "icon" && this.avatar.iconKey) {
        this.avatarLink = this.awsService.getObjectURL(this.avatar.iconKey);
      } else if (this.sizeRef === "small" && this.avatar.smallKey) {
        this.avatarLink = this.awsService.getObjectURL(this.avatar.smallKey);
      } else if (this.sizeRef === "medium" && this.avatar.mediumKey) {
        this.avatarLink = this.awsService.getObjectURL(this.avatar.mediumKey);
      } else if (this.avatar.avatarKey) {
        this.avatarLink = this.awsService.getObjectURL(this.avatar.avatarKey);
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
