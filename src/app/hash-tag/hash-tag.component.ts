import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-hash-tag',
  templateUrl: './hash-tag.component.html',
  styleUrls: ['./hash-tag.component.scss']
})
export class HashTagComponent implements OnInit {
  @Input() hashTagValue: string;
  constructor(private elm: ElementRef) {

  }

  ngOnInit(): void {
    if (!this.hashTagValue) {
      this.hashTagValue = this.elm.nativeElement.getAttribute('hash-tag-value');
    }
  }

}
