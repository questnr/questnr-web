import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'qnr-rank-card',
  templateUrl: './rank-card.component.html',
  styleUrls: ['./rank-card.component.scss']
})
export class RankCardComponent implements OnInit {

  @Input() title: string;
  @Input() followers: number;
  @Input() posts: number;
  @Input() rank: number;

  constructor() { }

  ngOnInit() {
  }

}
