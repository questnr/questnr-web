import { Component, OnInit } from '@angular/core';
import { SocialMediaConstants } from 'shared/constants/social-media-constant';

@Component({
  selector: 'app-social-media-links',
  templateUrl: './social-media-links.component.html',
  styleUrls: ['./social-media-links.component.scss']
})
export class SocialMediaLinksComponent implements OnInit {

  facebookLink: string = SocialMediaConstants.facebookLink;
  twitterLink: string = SocialMediaConstants.twitterLink;
  instagramLink: string = SocialMediaConstants.instagramLink;
  linkedInLink: string = SocialMediaConstants.linkedInLink;

  constructor() { }

  ngOnInit(): void {
  }

}
