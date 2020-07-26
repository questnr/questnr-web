import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog-title',
  templateUrl: './blog-title.component.html',
  styleUrls: ['./blog-title.component.scss']
})
export class BlogTitleComponent implements OnInit {
  @Input() blogTitle: string;
  @Input() onFeed: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
