import { Component, EventEmitter, OnInit, Output, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-emoticons',
  templateUrl: './emoticons.component.html',
  styleUrls: ['./emoticons.component.scss']
})
export class EmoticonsComponent implements OnInit {
  @Output() emojiData = new EventEmitter();
  @Input() userInputRef: ElementRef;
  constructor() { }
  ngOnInit(): void {
  }


  addEmoji($event: any) {
    // console.log(event);
    const text = this.userInputRef.nativeElement.value ? this.userInputRef.nativeElement.value : '';
    const start = this.userInputRef.nativeElement.selectionStart;
    const end = this.userInputRef.nativeElement.selectionEnd;
    const before = text.substring(0, start);
    const after = text.substring(end);
    this.userInputRef.nativeElement.value = before + $event.emoji.native + after;
    this.userInputRef.nativeElement.selectionStart = this.userInputRef.nativeElement.selectionEnd
      = start + $event.emoji.native.length;
    this.userInputRef.nativeElement.focus();
  }
}
