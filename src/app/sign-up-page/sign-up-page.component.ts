import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['../forgot-password/forgot-password.component.scss']
})
export class SignUpPageComponent implements OnInit {
  mobileView: boolean = false;
  screenWidth = window.innerWidth;
  @ViewChild("elementOnHTML") elementOnHTML: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
  }

  ngAfterViewInit() {
    if (this.mobileView) {
      this.renderer.setStyle(this.elementOnHTML.nativeElement, 'height', '100%');
      this.renderer.setStyle(this.elementOnHTML.nativeElement, 'margin-top', '20px');
    } else {
      this.renderer.setStyle(this.elementOnHTML.nativeElement, 'height', '85%');
      this.renderer.setStyle(this.elementOnHTML.nativeElement, 'margin-top', '50px');
    }
  }
}
