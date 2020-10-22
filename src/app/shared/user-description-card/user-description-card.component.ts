import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-user-description-card',
  templateUrl: './user-description-card.component.html',
  styleUrls: ['./user-description-card.component.scss']
})
export class UserDescriptionCardComponent implements OnInit {
  @Input() bio: string;
  @Input() username: string;
  @Input() relation: string;
  mobileView: boolean = false;
  isLoading: boolean = true;
  constructor(private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }
  ngAfterViewInit() {
    this.isLoading = false;
  }

}
