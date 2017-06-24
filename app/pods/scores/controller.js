import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Controller.extend({
  sortedScores: computed.sort('model', 'sortDefinition'),
  sortDefinition: ['durationMilliseconds'],
});
