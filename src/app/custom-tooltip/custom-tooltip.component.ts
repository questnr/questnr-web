import { Component, Input, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CustomTooltipType } from 'models/custom-tooltip.model';
import tippy, { animateFill } from 'tippy.js';

@Component({
  selector: 'custom-tooltip',
  templateUrl: './custom-tooltip.component.html',
  styleUrls: ['./custom-tooltip.component.scss']
})
export class CustomTooltipComponent implements OnInit, AfterViewInit {
  @Input() tooltipType: CustomTooltipType;
  @Input() communityName: string;
  customTooltipType = CustomTooltipType;
  @ViewChild("customTooltip") customTooltip: ElementRef;
  tooltipInstance: any;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    console.log("this.popTemplate", this.customTooltip);
    tippy(this.customTooltip.nativeElement, {
      content: this.getContent(),
      allowHTML: true,
      placement: 'right',
      onCreate(instance) {
        console.log("instance", instance);
        this.tooltipInstance = instance;
        this.tooltipInstance.show();
      },
    });
  }

  getContent() {
    const div = document.createElement('div');
    div.innerHTML = `<button mat-button class="btn-color">
    Join ${this.communityName} Community Now!
</button>`;
    return div;
  }

}
