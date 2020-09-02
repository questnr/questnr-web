import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'shared/constants';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FAQComponent implements OnInit {
  faqType: string;

  constructor(private route: ActivatedRoute,
    private router: Router) {
    this.faqType = this.route.snapshot.paramMap.get('faqType');
    // console.log("this.faqType", this.faqType);
    if (!this.faqType) {
      this.router.navigate(['/', GlobalConstants.error]);
    }
  }

  ngOnInit(): void {
  }

}
