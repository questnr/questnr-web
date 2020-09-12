import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FAQSearchModalComponent } from 'faq/faq-search-modal/faq-search-modal.component';

@Component({
  selector: 'app-faq-search-button',
  templateUrl: './faq-search-button.component.html',
  styleUrls: ['./faq-search-button.component.scss']
})
export class FAQSearchButtonComponent implements OnInit {
  @Input() queryString: string;
  @ViewChild("faqSearchModalRef") faqSearchModalRef: FAQSearchModalComponent;

  constructor() { }

  ngOnInit(): void {
  }

  openFAQSearchPage($event) {
    $event.preventDefault();
    this.faqSearchModalRef.open(this.queryString);
  }
}
