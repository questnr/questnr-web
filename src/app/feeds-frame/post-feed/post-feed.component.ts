import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss'],
  animations: [
    trigger('expand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PostFeedComponent implements OnInit {

  text = new FormControl();
  @Output() postData = new EventEmitter();

  isMediaEnabled = false;

  constructor() { }

  ngOnInit() {
  }
  post() {
    this.postData.emit(this.text.value);
    this.text.setValue('');
  }
  toggleAddMedia() {
    // this.isMediaEnabled = !this.isMediaEnabled;
  }
}
