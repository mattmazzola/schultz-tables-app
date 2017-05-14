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
        // Convert snake_case properties to cameCase properties
        const camelizedUser = Object.keys(userAuthData).reduce((newObj, key) => {
          const camelizedKey = Ember.String.camelize(key)
          newObj[camelizedKey] = userAuthData[key]
          return newObj
        }, {})

        // Set manual properties not automatically set by authData by 
        camelizedUser.minAgeRange = userAuthData.age_range.min
        camelizedUser.providerId = userAuthData.id

        const newUser = store.createRecord('user', camelizedUser)
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
