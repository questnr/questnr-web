import { Component, OnInit, ElementRef, ViewChild, Renderer2, Input } from '@angular/core';
import { SocialMediaConstants } from 'shared/constants/social-media-constant';

@Component({
  selector: 'app-social-media-links',
  templateUrl: './social-media-links.component.html',
  styleUrls: ['./social-media-links.component.scss']
})
export class SocialMediaLinksComponent implements OnInit {
  @ViewChild("socialMediaList") socialMediaList: ElementRef;
  @Input() color: string;
  facebookLink: string = SocialMediaConstants.facebookLink;
  twitterLink: string = SocialMediaConstants.twitterLink;
  instagramLink: string = SocialMediaConstants.instagramLink;
  linkedInLink: string = SocialMediaConstants.linkedInLink;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.renderer.addClass(this.socialMediaList.nativeElement, this.color);
  }

}
