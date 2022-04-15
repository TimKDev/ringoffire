// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Die folgenden Informationen müssen übergeben werden, damit Firebase richtig 
  // verbunden werden kann. Man findet sie in der Projekteinstellungen auf der 
  // Firebase Seite:
  firebase: {
    apiKey: "AIzaSyBGOC4E9L1k-8R-8Sg8qQ7qkcBNI9QjnSU",
    authDomain: "ring-of-fire-bc921.firebaseapp.com",
    projectId: "ring-of-fire-bc921",
    storageBucket: "ring-of-fire-bc921.appspot.com",
    messagingSenderId: "1020240853280",
    appId: "1:1020240853280:web:4aa6822fb3b72d2a2e7f45"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
