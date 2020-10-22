import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-no-community-members',
  templateUrl: './no-community-members.component.html',
  styleUrls: ['./no-community-members.component.scss']
})
export class NoCommunityMembersComponent implements OnInit {
  @Input() notAllowed: boolean = false;
  mobileView: boolean = false;

  constructor(private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }
}
