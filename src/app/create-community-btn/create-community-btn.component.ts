import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateCommunityComponent } from '../shared/components/dialogs/create-community/create-community.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-community-btn',
  templateUrl: './create-community-btn.component.html',
  styleUrls: ['./create-community-btn.component.scss']
})
export class CreateCommunityBtnComponent implements OnInit {
  @Input() type: any;
  mobileView = false;
  screenWidth = window.innerWidth;
  constructor(public dialog: MatDialog) { }

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
