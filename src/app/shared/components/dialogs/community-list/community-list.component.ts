import {Component, Inject, OnInit} from '@angular/core';
import {UserListComponent} from '../user-list/user-list.component';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Community} from '../../../../models/community.model';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.scss']
})
export class CommunityListComponent implements OnInit {
  mobileView = false;
  screenWidth = window.innerWidth;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Community) { }

  ngOnInit(): void {
    const width = this.screenWidth;
    if (width <= 800) {
      this.mobileView = true;
    } else if (width >= 1368) {
      this.mobileView = false;
    } else if (width >= 800 && width <= 1368) {
      this.mobileView = false;
    }
  }
}
