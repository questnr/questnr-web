importScripts('https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.10.0/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyAgfiLd02cWEIMafWhLrl4kBzpQrRE266k",
    authDomain: "questnr-web-1586188588294.firebaseapp.com",
    databaseURL: "https://questnr-web-1586188588294.firebaseio.com",
    projectId: "questnr-web-1586188588294",
    storageBucket: "questnr-web-1586188588294.appspot.com",
    messagingSenderId: "836632017511",
    appId: "1:836632017511:web:d69f610ffc055767aa72c2"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();