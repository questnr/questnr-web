import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-welcome-slides',
  templateUrl: './welcome-slides.component.html',
  styleUrls: ['./welcome-slides.component.scss']
})
export class WelcomeSlidesComponent {

  sliderOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true,
    autoplay: true
  };

  slides = [
    { title: 'Feature 1', content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt' },
    { title: 'Feature 2', content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt' },
    { title: 'Feature 3', content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt' },
    { title: 'Feature 4', content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt' }
  ];

  constructor() { }

}
