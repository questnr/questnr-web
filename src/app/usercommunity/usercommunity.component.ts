import { Component, Input, OnInit } from '@angular/core';
import { CreateCommunityComponent } from '../shared/components/dialogs/create.community/create-community.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {UserListComponent} from '../shared/components/dialogs/user-list/user-list.component';
import {Community} from '../models/community.model';

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
  ownedCommunity: Community[];
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
      if (result === 'true') {
        this.getUserOwnedCommunity();
      }
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
  checkImageExists(src) {
    if (src) {
      return src ;
    } else  {
      return  'assests/default.jpg';
    }
  }
}
