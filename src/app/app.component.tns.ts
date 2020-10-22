import { Component, OnInit } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(){

  }

  ngOnInit(): void {
    firebase.init({
      ...environment.firebase
    }).then(
      () => {
        console.log("firebase.init done");
      },
      error => {
        console.log(`firebase.init error: ${error}`);
      }
    );
  }
}
