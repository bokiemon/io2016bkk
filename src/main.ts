import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
import { HTTP_PROVIDERS } from '@angular/http';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: "AIzaSyBCKLdWHnxvNCIFsqh-BJo08fSDt7AQ0GY",
    authDomain: "angularfire-5f9c1.firebaseapp.com",
    databaseURL: "https://angularfire-5f9c1.firebaseio.com",
    storageBucket: "angularfire-5f9c1.appspot.com",
  })
]);

