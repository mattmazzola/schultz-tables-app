import Oauth2Bearer from 'torii/providers/oauth2-bearer';
import {configurable} from 'torii/configuration';
 
export default Oauth2Bearer.extend({
  name:    'azure-aad-b2c-oauth2implicit',
  baseUrl: 'https://login.microsoftonline.com/schultztables.onmicrosoft.com/oauth2/v2.0/authorize',

  // Url Parameter Defaults
  clientId: configurable('clientId', function () { return this._super(); }),
  responseType: 'id_token token',
  redirectUri: configurable('redirectUri', function(){ return this._super(); }),
  responseMode: 'fragment',
  scope: configurable('scope', 'openid https://schultztables.onmicrosoft.com/api/readwrite'),
  state: 'somestate',
  nonce: 'defaultNonce',
  p: 'B2C_1_signinfb',
  prompt: 'login',

  requiredUrlParams: ['client_id', 'response_type', 'redirect_uri', 'response_mode', 'state',  'nonce', 'p'],
  optionalUrlParams: [],
  responseParams: ['access_token', 'token_type', 'id_token', 'expires_in'],
  display: 'popup',

  open() {
    return this._super().then(authData => {
      // If the user hit 'cancel' or closed the pop-up throw error
      // Must check authorizationToken since that is the property the base Oauth2Bearer provider puts the data.
      if (!authData.authorizationToken) {
        throw new Error('User canceled authorization');
      }

      // Must place access_token property on the authData returned since that is the property the OAuth2Bearer authorizer looks for.
      authData.access_token = authData.authorizationToken.access_token

      // Extract basic user data from Identity Token and place it on authData so it can be easily presented in the UI without making request for user profile to server.
      const idToken = authData.authorizationToken.id_token;
      const idTokenData = JSON.parse(atob(idToken.split('.')[1]));

      const userProperties = {
        id: idTokenData.oid,
        email: idTokenData.emails[0],
        name: idTokenData.name,
        expires: idTokenData.exp * 1000
      };

      Object.assign(authData, userProperties);

      return authData;
    });
  },

  fetch(authData) {
    if (authData) {
      const now = (new Date()).getTime();
      if (authData.expires - now > 1000) {
        return authData
      }
    }
  }
});
