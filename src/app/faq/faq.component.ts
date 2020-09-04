import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KnowMoreLinkType } from 'models/know-more-type';
import { GlobalConstants } from 'shared/constants';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FAQComponent implements OnInit {
  KnowMoreLinkTypeClass = KnowMoreLinkType;
  faqType: KnowMoreLinkType;

  constructor(private route: ActivatedRoute,
    private router: Router) {
    let faqType = this.route.snapshot.paramMap.get('faqType') as KnowMoreLinkType;
    let faqTypeList = Object.keys(KnowMoreLinkType);
    // console.log("faqTypeList", faqTypeList, faqType);
    for (let index = 0; index < faqTypeList.length; index++) {
      // console.log("KnowMoreLinkType[faqTypeList[index]]", KnowMoreLinkType[faqTypeList[index]]);
      if (faqType == KnowMoreLinkType[faqTypeList[index]]) {
        // console.log("faqTypeList[index]", index, faqTypeList[index])
        this.faqType = KnowMoreLinkType[faqTypeList[index]] as KnowMoreLinkType;
        break;
      }
    }
    // this.faqType = this.route.snapshot.paramMap.get('faqType') as KnowMoreLinkType;
    // console.log("this.faqType", this.faqType, this.faqType == this.KnowMoreLinkTypeClass.communityPrivacy);
    if (!this.faqType) {
      this.router.navigate(['/', GlobalConstants.error]);
    }
  }

  ngOnInit(): void {
  }

}
