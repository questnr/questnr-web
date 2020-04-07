import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'qnr-rank-card',
  templateUrl: './rank-card.component.html',
  styleUrls: ['./rank-card.component.scss']
})
export class RankCardComponent implements OnInit {

  @Input() title: string;
  @Input() imgSrc: string;
  @Input() followers: number;
  @Input() posts: number;
  @Input() rank: number;

  constructor() { }

  ngOnInit() {
  }
  getImgUrl(src: string) {
    return src ? `url(${src})` : `url("assets/default.jpg")`;
  }
}
