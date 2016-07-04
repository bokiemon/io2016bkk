# IO2016 Extended Bangkok Progressive Web Demo (Having some fun with Angular2 and PWA)

This is a demo application that lists all the sessions in IO2016 Extended Bangkok (25th June 2016).

The demo showcased the following: 

- Developing a Progressive Web App using Angular2 with angular-cli
- Incorporating Angular Material 2 UI Components
- Generate Service Worker file with sw-precache and gulp
- Data synchronization with angularfire2
- Push Notification with Firebase Realtime Database and Google Cloud Messaging (GCM)

More info:

- [Angular 2](https://angular.io/)
- [Angular CLI](https://github.com/angular/angular-cli)
- [AngularFire2](https://github.com/angular/angularfire2)
- [Angular Material 2](https://github.com/angular/material2)
- [sw-precache](https://github.com/GoogleChrome/sw-precache)

## Setup Project

Git clone this repo and install all packages with

```
npm install
```

## Setup Firebase

Create a new Firebase project at firebase.google.com and import firebase_data.json into Realtime Database.

## Setup Google Cloud Messaging for Push Notification

Follow this [codelab](https://developers.google.com/web/fundamentals/getting-started/push-notifications/?hl=en) to setup Google Cloud Messaging. The Push Notification logic is in src/sw_push.js. This file will be used by gulp to generate the final service worker javascript (sw.js)

The demo code doesn't deal with push notification with payload. Follow these [steps](https://developers.google.com/web/updates/2016/03/web-push-encryption?hl=en) to setup notification with payload. 

***Tip***: use [web-push npm](https://www.npmjs.com/package/web-push) to send a push notification with encrypted payload to GCM.

Launch Chrome Dev Tools -> Console. You will see the print out for endpoint, auth and p256dh. Take note of these values.

Run the following in a node console after installing web-push

```javascript
var webpush = require('web-push');

webpush.setGCMAPIKey('<replace with GCM API key>');

webpush.sendNotification(
"<replace with endpoint>", 
{
  userAuth:"<auth>", userPublicKey:"<p256dh>", 
  payload:"hello world"
});
```

Check out this simple web push [demo](https://gauntface.github.io/simple-push-demo/) for more code references.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Note: Service Worker will only be registered for production build generated with `ng build -prod`

Run `gulp` in the top level directory. Gulp will do the following: 

* Generate src/sw_1.js 
* Concat src/sw_1.js with sw_push.js
* Generate dist/sw.js 

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Recommended: Download and start [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en) to watch for file change at dist/ instead.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/route/class`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
