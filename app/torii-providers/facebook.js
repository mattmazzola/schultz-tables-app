import Ember from 'ember';
import Oauth2Bearer from 'torii/providers/oauth2-bearer';
import {configurable} from 'torii/configuration';
 
export default Oauth2Bearer.extend({
  name:    'facebook-oauth2implicit',
  baseUrl: 'https://www.facebook.com/dialog/oauth',

  requiredUrlParams: ['display'],

  responseParams: ['token', 'state'],

  scope: configurable('scope', 'email'),

  display: 'popup',
  redirectUri: configurable('redirectUri', function(){
    // A hack that allows redirectUri to be configurable
    // but default to the superclass
    return this._super();
  }),

  open() {
    return this._super().then(authData => {
      // If the user hit 'cancel' or closed the pop-up throw error
      if (!authData.authorizationToken) {
        throw new Error('User canceled authorization');
      }

      const accessToken = authData.authorizationToken.token;

      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.$.ajax({
          url: 'https://graph.facebook.com/me?fields=id,email,name,first_name,last_name,age_range,link,gender,locale,picture,timezone,updated_time,cover,verified',
          headers: { 'Authorization': `Bearer ${accessToken}` },
          success: Ember.run.bind(null, resolve),
          error: Ember.run.bind(null, reject)
        });
      }).then((facebookUser) => {
        facebookUser.accessToken = accessToken;
        facebookUser.picture = facebookUser.picture.data.url;
        return facebookUser;
      });
    });
  },

  fetch(authData) {
      return authData;
  }
});
