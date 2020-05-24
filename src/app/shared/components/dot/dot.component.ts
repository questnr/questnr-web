import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dot',
  templateUrl: './dot.component.html',
  styleUrls: ['./dot.component.scss']
})
export class DotComponent implements OnInit {
  @Input() radius: number;

  @ViewChild('elementOnHTML', { static: false }) elementOnHTML: ElementRef;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
    if (!this.radius) this.radius = 5;
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.elementOnHTML.nativeElement, 'width', this.radius + "px");
    this.renderer.setStyle(this.elementOnHTML.nativeElement, 'height', this.radius + "px");
  }

}
