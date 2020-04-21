import { Component, OnInit } from '@angular/core';
import {GoogleLoginProvider} from 'angularx-social-login';
import {CommunityService} from './community.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {REGEX} from '../shared/constants';
import {CreateCommunityComponent} from '../shared/components/dialogs/create.community/create-community.component';
import {MatDialog} from '@angular/material';
import {DescriptionComponent} from '../shared/components/dialogs/description/description.component';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {

  constructor(public auth: CommunityService, public fb: FormBuilder,public dialog: MatDialog) { }
  cards = [
    {
      title: 'Sats community',
      detail: 'Some quick example text to build on the card title and make up the bulk of the card content',
      members: '200',
      lastActive: '8',
      src: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Sats community',
      detail: 'Some quick example text to build on the card title and make up the bulk of the card content',
      members: '200',
      lastActive: '8',
      src: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Sats community',
      detail: 'Some quick example text to build on the card title and make up the bulk of the card content',
      members: '200',
      lastActive: '8',
      src: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Sats community',
      detail: 'Some quick example text to build on the card title and make up the bulk of the card content',
      members: '200',
      lastActive: '8',
      src: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    }
  ];

  openCommunityDesc(event): void {
    console.log();
    // @ts-ignore
    const dialogRef = this.dialog.open(DescriptionComponent, {
      width: '500px',
      data: { desc : event.target.innerText}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  ngOnInit() {
  }
}
