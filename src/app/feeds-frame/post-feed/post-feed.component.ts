import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss']
})
export class PostFeedComponent implements OnInit {

  text = new FormControl();
  @Output() postData = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  post() {
    this.postData.emit(this.text.value);
    this.text.setValue('');
  }

}
