export class environment {
  static production = false;
  static baseUrl = 'http://localhost:3010/api/v1/';
  // baseUrl = 'https://internal.questnr.com/api/v1/';
  static allowTracking = false;
  static googleKey = '836632017511-na1k4gagi79qlvdp644q1shd0rjffoc9.apps.googleusercontent.com';
  static fbKey = '1336590906533811';
  // s3Bucket = "questnr-user-assets";
  static s3Bucket = "questnr-beta";
  static firebase = {
    apiKey: 'AIzaSyAgfiLd02cWEIMafWhLrl4kBzpQrRE266k',
    authDomain: 'questnr-web-1586188588294.firebaseapp.com',
    databaseURL: 'https://questnr-web-1586188588294.firebaseio.com',
    projectId: 'questnr-web-1586188588294',
    storageBucket: 'questnr-web-1586188588294.appspot.com',
    messagingSenderId: '836632017511',
    appId: '1:836632017511:web:d69f610ffc055767aa72c2'
  }

  static setData(data) {
    if (data.hasOwnProperty('baseUrl')) {
      this.baseUrl = data.baseUrl;
    }

    if (data.hasOwnProperty('allowTracking')) {
      this.allowTracking = data.allowTracking;
    }

    if (data.hasOwnProperty('s3Bucket')) {
      this.s3Bucket = data.s3Bucket;
    }
  }
};
