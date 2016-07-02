import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, 
  FirebaseObjectObservable } from 'angularfire2';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    MdIcon, 
    MD_CARD_DIRECTIVES, 
    MD_BUTTON_DIRECTIVES, 
    MD_CARD_DIRECTIVES,
    MD_BUTTON_DIRECTIVES, 
    MD_TOOLBAR_DIRECTIVES, 
    MD_CARD_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES
  ],
  providers: [MdIconRegistry]
})
export class AppComponent {

  /*
  webSessions: FirebaseListObservable<any>;
  firebaseSessions: FirebaseListObservable<any[]>;
  mobileSessions: FirebaseListObservable<any[]>;
  */

  webSessions: any;
  firebaseSessions: any;
  mobileSessions: any;
  sessions:any

  online:boolean;
  
  constructor(af: AngularFire) {
    
    this.online = navigator.onLine;

    //Read data from Firebase if application is online.
    if(navigator.onLine) {
      
      this.webSessions = af.database.list('/webSessions')
      this.firebaseSessions = af.database.list('/firebaseSessions');
      this.mobileSessions = af.database.list('/mobileSessions');

      let firebaseCache:Array<any>[] = [];
      let webCache:Array<any>[] = [];
      let mobileCache:Array<any>[] = [];
      
      //cache data in localstorage.
      this.firebaseSessions.subscribe(
        x => { 
          for (var property in x) {
            firebaseCache.push(x[property]);  
          }
          localStorage.setItem("firebaseSessions", JSON.stringify(firebaseCache));
        },
        e => console.log('onError'),
        () => {
          console.log('complete')
      });

      this.mobileSessions.subscribe(
        x => { 
          for (var property in x) {
            mobileCache.push(x[property]);  
          }
          localStorage.setItem("mobileSessions", JSON.stringify(mobileCache));
        },
        e => console.log('onError'),
        () => {
          console.log('complete')
      });

      this.webSessions.subscribe(
        x => { 
          for (var property in x) {
            webCache.push(x[property]);  
          }
          localStorage.setItem("webSessions", JSON.stringify(webCache));
        },
        e => console.log('onError'),
        () => {
          console.log('complete')
      });
    } else {
        //read from local storage if application is offline.
        this.firebaseSessions = JSON.parse(localStorage.getItem("firebaseSessions"));
        this.mobileSessions = JSON.parse(localStorage.getItem("mobileSessions"));
        this.webSessions = JSON.parse(localStorage.getItem("webSessions"));
    }
    this.sessions = this.webSessions;
  }

  showSessions(sessionType: String) {

    if(sessionType == "firebase")
      this.sessions = this.firebaseSessions;
    else if(sessionType == "mobile") {
      this.sessions = this.mobileSessions;
    }
    else {
      this.sessions = this.webSessions;
    }
  }

  title = 'IO Extended BKK 2016';
}
