import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    loginWithFacebookB2C() {
      this.get('session').authenticate('authenticator:torii', 'aadb2c');
    }
  }
});
