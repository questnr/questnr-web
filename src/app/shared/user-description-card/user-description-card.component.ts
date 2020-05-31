import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-description-card',
  templateUrl: './user-description-card.component.html',
  styleUrls: ['./user-description-card.component.scss']
})
export class UserDescriptionCardComponent implements OnInit {
  @Input() bio: string;
  @Input() username: string;
  @Input() relation: string;
  @Input() mobileView: string;
  isLoading: boolean = true;
  constructor() { }

  ngOnInit(): void {
    this.isLoading = false;

  }
  ngAfterViewInit() {
  }

}
