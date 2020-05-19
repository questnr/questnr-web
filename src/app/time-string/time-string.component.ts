import { Component, OnInit, Input } from '@angular/core';
import { MetaData } from 'models/common.model';

@Component({
  selector: 'app-time-string',
  templateUrl: './time-string.component.html',
  styleUrls: ['./time-string.component.scss']
})
export class TimeStringComponent implements OnInit {
  @Input() metaData: MetaData;
  constructor() { }

  ngOnInit(): void {
  }

}
