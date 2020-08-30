import { Component, OnInit, Renderer2, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-community-card-loader',
  templateUrl: './community-card-loader.component.html',
  styleUrls: ['./community-card-loader.component.scss']
})
export class CommunityCardLoaderComponent implements OnInit, AfterViewInit {
  @Input() showActionBtn: boolean = true;
  @ViewChild("communityCardLoader") communityCardLoader: ElementRef;
  @ViewChild("bannerRef") bannerRef: ElementRef;

  constructor(private renderer2: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let width = this.communityCardLoader.nativeElement?.getBoundingClientRect()?.width;
    this.renderer2.setStyle(this.bannerRef.nativeElement, "height", width / 4 + "px");
    console.log("this.communityCardLoader.nativeElement.width", this.communityCardLoader.nativeElement.getBoundingClientRect(), width);
  }
}
