import { CordovaPopupNavigator, UserManagerSettings, WebStorageStateStore } from 'oidc-client';
export const environment = {
  production: true
};
export const httpEndpoint = 'https://localhost:5100';
export const oidcGrantTypes = {
  authorizationCode: 'code',
  implicit: 'id_token token'
};
export const clientSetting: UserManagerSettings = {
  authority: 'http://colo.gq/RC/',
  client_id: 'webapp',
  client_secret: 'secret',
  popup_redirect_uri: 'http://localhost:8100/auth-callback',
  post_logout_redirect_uri: 'http://localhost:8100/',
  response_type: oidcGrantTypes.authorizationCode,
  scope: 'openid profile email offline_access colo.netcore.api',
  filterProtocolClaims: true,
  loadUserInfo: true,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  popupNavigator: new CordovaPopupNavigator()
};
