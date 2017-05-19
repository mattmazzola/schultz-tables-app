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
      if (userAuthData.id) {
        const newUserProperties = {
          id: userAuthData.id,
          email: userAuthData.email,
          name: userAuthData.name
        };
        const newUser = store.createRecord('user', newUserProperties)
        const newUserPromise = newUser.save()
          .catch(error => {
            return store.find('user', userAuthData.id)
          })
        resolve(newUserPromise)
      }
      else {
        resolve(null)
      }
    })

    return DS.PromiseObject.create({
      promise: userPromise
    })
  })
});
