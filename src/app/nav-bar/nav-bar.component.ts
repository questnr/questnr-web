import { Component, OnInit, Input, Output, EventEmitter, Renderer2, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, AfterViewInit {
  @Input() title: string;
  @Output() backAction = new EventEmitter();
  @ViewChild("navBarHTML") navBarHTML: ElementRef;

  constructor(private renderer2: Renderer2) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (!this.title) {
      this.renderer2.setStyle(this.navBarHTML.nativeElement, "height", "3rem");
    }
  }

  onBack() {
    this.backAction.emit();
  }
}
