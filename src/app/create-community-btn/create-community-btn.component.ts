import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CreateCommunityComponent} from '../shared/components/dialogs/create.community/create-community.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-create-community-btn',
  templateUrl: './create-community-btn.component.html',
  styleUrls: ['./create-community-btn.component.scss']
})
export class CreateCommunityBtnComponent implements OnInit {
  @Input() type: any;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  createCommunity(): void {
    const dialogRef = this.dialog.open(CreateCommunityComponent, {
      width: '800px',
      // data: { desc : event.target.innerText}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
