import { Component, OnInit } from '@angular/core';
// import * as firebase from '@nativescript/firebase';
import {environment} from '../environments/environment';
import { isAndroid, isIOS } from "@nativescript/core/platform";

@Component({
  selector: 'app2-root',
  templateUrl: './app2.component.tns.html',
})
export class App2Component implements OnInit {
  constructor(){

  }

  ngOnInit(): void {
    // firebase.init({
    //   ...environment.firebase
    // }).then(
    //   () => {
    //     console.log("firebase.init done");
    //   },
    //   error => {
    //     console.log(`firebase.init error: ${error}`);
    //   }
    // );
  }
}
