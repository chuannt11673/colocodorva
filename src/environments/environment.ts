// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.

import { UserManagerSettings } from 'oidc-client';

// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false
};
export const httpEndpoint = 'http://colo.gq';
export const userManagerSettings: UserManagerSettings = {
  authority: httpEndpoint,
  client_id: 'spa',
  scope: 'openid profile WebAppAPI',
  response_type: 'code',
  popup_redirect_uri: window.location.origin + '/auth-callback',
  popup_post_logout_redirect_uri: window.location.origin
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
