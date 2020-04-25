import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material';
import {CreateCommunityComponent} from '../shared/components/dialogs/create.community/create-community.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-usercommunity',
  templateUrl: './usercommunity.component.html',
  styleUrls: ['./usercommunity.component.scss']
})
export class UsercommunityComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  @Input() hasCommunity = true;

  ngOnInit() {
  }
  createCommunity(): void {
    console.log();
    // @ts-ignore
    const dialogRef = this.dialog.open(CreateCommunityComponent, {
      width: '800px',
      // data: { desc : event.target.innerText}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
