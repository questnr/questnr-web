import { AfterViewInit, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-community-loader',
  templateUrl: './community-loader.component.html',
  styleUrls: ['./community-loader.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommunityLoaderComponent implements OnInit, AfterViewInit {
  @Input() rows: number = 5;
  listItems;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setListItems(this.rows ? this.rows : 5);
  }

  setListItems(rows: number) {
    this.rows = rows;
    this.listItems = Array(this.rows);
  }
}
