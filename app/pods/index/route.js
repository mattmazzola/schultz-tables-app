import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  inject
} = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  tableService: inject.service('table'),

  actions: {
    requestStart() {
      return this.get('tableService').fetchStartTime();
    },

    submitScore(scoreInput) {
      return this.get('tableService').saveScore(scoreInput);
    }
  }
});
