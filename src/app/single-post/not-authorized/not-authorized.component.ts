import { Component, OnInit, Input } from '@angular/core';
import { Community } from 'models/community.model';
import { GlobalConstants } from 'shared/constants';
import { GlobalService } from 'global.service';
import { Message } from 'shared/constants/messages';

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.scss']
})
export class NotAuthorizedComponent implements OnInit {
  @Input() community: Community;
  mobileView: boolean = false;
  communityPath: string = GlobalConstants.communityPath;
  message: string = Message.C100;

  constructor(private _gobalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._gobalService.isMobileView();
  }

}
