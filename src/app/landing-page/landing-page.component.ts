import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Tile} from "../app-routing.module";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class LandingPageComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'One', cols: 2, rows: 5, color: 'lightblue'},
    {text: 'Two', cols: 2, rows: 5, color: 'lightgreen'}
  ];
  breakpoint: number;
  constructor() { }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }
  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
  }

}
