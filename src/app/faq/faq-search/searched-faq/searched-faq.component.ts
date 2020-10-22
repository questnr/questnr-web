import { Component, Input, OnInit } from '@angular/core';
import { FaqItemSearchPage, FaqItemType } from '../../../models/faq.model';
import { GlobalConstants } from '../../../shared/constants';

@Component({
  selector: 'searched-faq',
  templateUrl: './searched-faq.component.html',
  styleUrls: ['./searched-faq.component.scss']
})
export class SearchedFaqComponent implements OnInit {
  @Input() faqItemSearchPage: FaqItemSearchPage;
  faqItemTypeClass = FaqItemType;
  helpPath: string = GlobalConstants.helpPath;
  questnrPath: string = GlobalConstants.questnrPath;

  constructor() { }

  ngOnInit(): void {

  }

}
