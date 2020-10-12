import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-trash-icon',
  templateUrl: './trash-icon.component.html',
  styleUrls: ['./trash-icon.component.scss']
})
export class TrashIconComponent implements OnInit, AfterViewInit {
  trashIconRef: ElementRef;
  @ViewChild("trashIcon")
  set trashIcon(trashIconRef: ElementRef) {
    this.trashIconRef = trashIconRef;
  }
  @Input() height: string;
  @Input() toolTipText: string;

  constructor(private renderer2: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.height)
      this.renderer2.setStyle(this.trashIconRef.nativeElement, "height", this.height);
  }

  hover() {
    this.trashIconRef.nativeElement.setAttribute('src', '/assets/red-trash-can.svg');
  }

  unhover() {
    this.trashIconRef.nativeElement.setAttribute('src', '/assets/trash-can.svg');
  }
}
