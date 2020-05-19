import {Component, Input, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {Community} from '../../../models/community.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-community-card-mobile-view',
  templateUrl: './community-card-mobile-view.component.html',
  styleUrls: ['./community-card-mobile-view.component.scss']
})
export class CommunityCardMobileViewComponent implements OnInit {
  constructor(public route: ActivatedRoute) { }
  @Input() community: Community[];
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false,
    autoplay: false
  };
  ngOnInit(): void {
  }

  routeToCommunity(slug) {
    window.open('/community/' + slug, '_self');
  }
}
