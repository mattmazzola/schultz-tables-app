import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Route.extend({
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
