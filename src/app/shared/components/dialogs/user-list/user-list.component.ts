import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../../models/user.model';
import {UserProfileCardServiceComponent} from '../../../../user-profile-card/user-profile-card-service.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserListService} from './user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  loading = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: User, public  userProfileCardServiceComponent: UserProfileCardServiceComponent,
              public userListService: UserListService, public dialogRef: MatDialogRef<UserListComponent>) {
  }

  userList: User;
  searchResultList: User;
  searchResult = false;
  noResultFound = false;

  ngOnInit(): void {
    this.userList = this.data;
  }

  getUserImage(src) {
    if (src == null) {
      return 'assets/default.jpg';
    } else {
      return src;
    }
  }

  follow(id) {
    this.userProfileCardServiceComponent.followMe(id).subscribe((res: any) => {
      console.log(res);
    }, error => {
      console.log(error.error.errorMessage);
    });
  }

  searchUserList(searchString) {
    this.noResultFound = false;
    this.loading = true;
    // tslint:disable-next-line:triple-equals
    if (searchString != '') {
      setTimeout(() => {
        this.userListService.searchUser(searchString).subscribe((res: any) => {
          console.log('serach resuult for :' + searchString + 'is===', res);
          this.searchResultList = res.content;
          this.searchResult = true;
          if (res.content.length === 0 ) {
            this.noResultFound = true;
          } else {
            this.noResultFound = false;
          }
          this.loading = false;
        }, error => {
          console.log(error.error.errorMessage);
          this.searchResult = false;
          this.loading = false;
          this.noResultFound = true;
        });
      }, 2000);
    } else {
      this.loading = false;
      this.searchResult = false;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
