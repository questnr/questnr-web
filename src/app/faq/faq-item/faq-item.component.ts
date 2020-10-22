import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { GlobalService } from '../../global.service';
import { FaqItemType } from '../../models/faq.model';

@Component({
  selector: 'faq-item',
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqItemComponent implements OnInit, AfterViewInit {
  @Input() title: string = "TITLE";
  @Input() faqItemType: FaqItemType = FaqItemType.classified;
  mobileView: boolean = false;
  @ViewChild("faqItem") faqItem: ElementRef;
  @ViewChild("matExpansionPanel") matExpansionPanel: MatExpansionPanel;

  constructor(private _globalService: GlobalService,
    private renderer2: Renderer2) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

  ngAfterViewInit(): void {
    if (this.faqItemType === FaqItemType.searched) {
      this.renderer2.setStyle(this.faqItem.nativeElement, "padding", "0px 0px 0px");
      this.matExpansionPanel.open();
    } else {
      this.renderer2.setStyle(this.faqItem.nativeElement, "padding", "0px 0px 15px");
    }
  }

}
