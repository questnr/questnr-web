import { Component, OnInit, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-overlay',
  templateUrl: './search-overlay.component.html',
  styleUrls: ['./search-overlay.component.scss']
})
export class SearchOverlayComponent implements OnInit {
  @Output() closeSearchOverlay = new EventEmitter();
  elementOnHTMLRef: ElementRef;
  @ViewChild("elementOnHTML")
  set elementOnHTML(elementOnHTMLRef: ElementRef) {
    this.elementOnHTMLRef = elementOnHTMLRef;
    this.hide();
  }

  constructor(private renderer2: Renderer2) { }

  ngOnInit(): void {
  }

  show() {
    this.renderer2.setStyle(this.elementOnHTMLRef.nativeElement, "display", "block");
  }

  hide() {
    this.renderer2.setStyle(this.elementOnHTMLRef.nativeElement, "display", "none");
  }

  handleClick($event) {
    this.closeSearchOverlay.emit();
  }

}
