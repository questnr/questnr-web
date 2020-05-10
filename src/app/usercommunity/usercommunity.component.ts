import { Component, Input, OnInit } from '@angular/core';
import { CreateCommunityComponent } from '../shared/components/dialogs/create.community/create-community.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-usercommunity',
  templateUrl: './usercommunity.component.html',
  styleUrls: ['./usercommunity.component.scss']
})
export class UsercommunityComponent implements OnInit {

  constructor(public dialog: MatDialog, public http: HttpClient) {
  }
  @Input() profileUserId: number;
  @Input() userId: number;
  @Input() hasCommunity = true;
  @Input() defaultImage = 'assets/default.jpg';
  @Input() relation;
  baseUrl = environment.baseUrl;
  ownedCommunity = [];
  loader = false;

  ngOnInit() {
    setTimeout( () => {
      this.getUserOwnedCommunity();
    }, 2000);
  }

  createCommunity(): void {
    const dialogRef = this.dialog.open(CreateCommunityComponent, {
      width: '800px',
      // data: { desc : event.target.innerText}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.getUserOwnedCommunity();
      // this.animal = result;
    });
  }

  getUserOwnedCommunity() {
    this.loader = true;
    this.http.get(this.baseUrl + 'user/' + this.userId + '/community').subscribe((res: any) => {
      this.loader = false;
      this.ownedCommunity = res.content;
      // console.log(res.content);
    }, error => {
      this.loader = false;
      // console.log(error);
    });
  }
}
