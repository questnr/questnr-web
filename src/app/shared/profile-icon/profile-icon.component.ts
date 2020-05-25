import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.scss']
})
export class ProfileIconComponent implements OnInit {
  @Input() avatarLink: string;
  @Input() height: number = 25;
  @Input() alt: string = "image";
  loading: boolean = true;
  @ViewChild('elementOnHTML', { static: false }) elementOnHTML: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {

  }
  ngAfterVieWInit() {
    this.renderer.setStyle(this.elementOnHTML.nativeElement, 'height', this.height + "px");
  }
  onLoad() {
    this.loading = false;
  }
}
