import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'full-screen-media',
  templateUrl: './full-screen-media.component.html',
  styleUrls: ['./full-screen-media.component.scss']
})
export class FullScreenMediaComponent implements OnInit {
  mediaSrc: string;
  @ViewChild("fullScreenMedia") fullScreenMedia: ElementRef;
  @ViewChild("fullScreenMediaOverlay") fullScreenMediaOverlay: ElementRef;

  constructor(private renderer2: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  open(mediaSrc) {
    console.log("mediaSrc", mediaSrc);
    if (mediaSrc) {
      this.mediaSrc = mediaSrc;
      this.renderer2.setStyle(this.fullScreenMediaOverlay.nativeElement, "display", "block");
      this.renderer2.setStyle(this.fullScreenMedia.nativeElement, "display", "block");
    }
  }
  close() {
    this.renderer2.setStyle(this.fullScreenMediaOverlay.nativeElement, "display", "none");
    this.renderer2.setStyle(this.fullScreenMedia.nativeElement, "display", "none");
  }

  stopScroll(event) {
    console.log("stopScroll", event);
    event.preventDefault();
  }
}
