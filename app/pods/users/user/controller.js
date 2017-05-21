import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  sessionAccount: Ember.inject.service('session-account'),

  isCurrentUser: computed('session', 'model', function () {
    const sessionAccount = this.get('sessionAccount');
    const userBeingViewed = this.get('model');

    return sessionAccount.get('userAuthData.id') === userBeingViewed.id;
  }),

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
