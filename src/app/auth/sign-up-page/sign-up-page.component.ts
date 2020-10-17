import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { GlobalService } from 'global.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['../forgot-password/forgot-password.component.scss']
})
export class SignUpPageComponent implements OnInit {
  mobileView: boolean = false;
  @ViewChild("elementOnHTML") elementOnHTML: ElementRef;

  constructor(private renderer: Renderer2,
    private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
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
