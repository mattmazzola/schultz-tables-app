import Ember from 'ember';

const {
  inject,
  computed
} = Ember;

export default Ember.Service.extend({
  session: inject.service('session'),

  userAuthData: computed('session.data.authenticated', function() {
    return this.get('session.data.authenticated');
  })
});
