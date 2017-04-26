import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    loginWithFacebook() {
      console.log('loginWithFacebook');
      this.get('session').authenticate('authenticator:torii', 'facebook');
    }
  }
});
