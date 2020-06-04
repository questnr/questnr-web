import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() size: string;
  @Input() color: string;
  @Input() width: number;
  @Input() height: number;
  @Input() text: string;

  @ViewChild('elementOnHTML', { static: false }) elementOnHTML: ElementRef;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    if (this.width && this.height) {
      this.renderer.setStyle(this.elementOnHTML.nativeElement, "width", this.width + "rem");
      this.renderer.setStyle(this.elementOnHTML.nativeElement, "height", this.height + "rem");
    } else {
      if (this.size == "md")
        this.renderer.addClass(this.elementOnHTML.nativeElement, 'spinner-border-md');
      else
        this.renderer.addClass(this.elementOnHTML.nativeElement, 'spinner-border-sm');
    }

    if (this.color == "muted")
      this.renderer.addClass(this.elementOnHTML.nativeElement, 'text-muted');
    else if (this.color == "primary")
      this.renderer.addClass(this.elementOnHTML.nativeElement, 'text-primary');
    else if (this.color == "success")
      this.renderer.addClass(this.elementOnHTML.nativeElement, 'text-success');
    else if (this.color == "info")
      this.renderer.addClass(this.elementOnHTML.nativeElement, 'text-info');
    else if (this.color == "warning")
      this.renderer.addClass(this.elementOnHTML.nativeElement, 'text-warning');
    else if (this.color == "danger")
      this.renderer.addClass(this.elementOnHTML.nativeElement, 'text-danger');
    else if (this.color == "secondary")
      this.renderer.addClass(this.elementOnHTML.nativeElement, 'text-secondary');
    else if (this.color == "dark")
      this.renderer.addClass(this.elementOnHTML.nativeElement, 'text-dark');
    else if (this.color == "light")
      this.renderer.addClass(this.elementOnHTML.nativeElement, 'text-light');
  }

}
