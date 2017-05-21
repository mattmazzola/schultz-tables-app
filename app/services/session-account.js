import Ember from 'ember';
import DS from 'ember-data';

const {
  inject,
  computed
} = Ember;

export default Ember.Service.extend({
  session: inject.service('session'),
  store: inject.service('store'),

  userAuthData: computed('session.data.authenticated', function() {
    return this.get('session.data.authenticated');
  }),

  user: computed('session.data.authenticated.id', function () {
    const userAuthData = this.get('session.data.authenticated')
    const store = this.get('store')

    const userPromise = new Ember.RSVP.Promise(resolve => {
      const userPromise = userAuthData.id ? store.find('user', userAuthData.id) : null;
      resolve(userPromise);
    });

    return DS.PromiseObject.create({
      promise: userPromise
    })
  })
});
