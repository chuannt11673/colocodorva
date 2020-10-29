import { CordovaPopupNavigator, UserManagerSettings } from 'oidc-client';

export const environment = {
  production: true
};
export const httpEndpoint = 'http://colo.gq';
export const userManagerSettings: UserManagerSettings = {
  authority: httpEndpoint,
  client_id: 'spa',
  scope: 'openid profile WebAppAPI',
  response_type: 'code',
  popup_redirect_uri: window.location.origin + '/auth-callback',
  popup_post_logout_redirect_uri: window.location.origin,
  popupNavigator: new CordovaPopupNavigator()
};
