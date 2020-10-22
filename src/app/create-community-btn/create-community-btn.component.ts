import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateCommunityComponent } from '../shared/components/dialogs/create-community/create-community.component';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-create-community-btn',
  templateUrl: './create-community-btn.component.html',
  styleUrls: ['./create-community-btn.component.scss']
})
export class CreateCommunityBtnComponent implements OnInit {
  @Input() type: any;
  mobileView = false;
  constructor(public dialog: MatDialog,
    private _globalService: GlobalService) { }

  ngOnInit(): void {
    this.mobileView = this._globalService.isMobileView();
  }

  createCommunity(): void {
    const dialogRef = this.dialog.open(CreateCommunityComponent, {
      // width: '800px',
      maxWidth: this.mobileView ? "90vw" : "60vw",
      width: this.mobileView ? "90vw" : "60vW"
      // data: { desc : event.target.innerText}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
