// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    accessToken: "accessToken",
    endpoint: {
        upload: "http://localhost:3000/upload/",
        auth: "http://localhost:3000/auth/",
        user: "http://localhost:3000/user/",
        order: "http://localhost:3000/order/",
        city: "http://localhost:3000/city/",
        status: "http://localhost:3000/status/",
        vendingMachine: "http://localhost:3000/vendingmachine/"
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */

// Included with Angular CLI.
// import 'zone.js/dist/zone-error';  
