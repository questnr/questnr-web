import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-emoticons',
  templateUrl: './emoticons.component.html',
  styleUrls: ['./emoticons.component.scss']
})
export class EmoticonsComponent implements OnInit {
  @Output() emojiData = new EventEmitter();
  constructor() { }
  ngOnInit(): void {
  }


  addEmoji($event: any) {
    this.emojiData.emit($event.emoji);
  }
}
