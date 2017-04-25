import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    loginWithFacebook() {
      console.log('loginWithFacebook');
    },

    loginWithTwitter() {
      console.log('loginWithTwitter');
    },

    loginWithGoogle() {
      console.log('loginWithGoogle');
    }
  }
});
