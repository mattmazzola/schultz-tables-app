import Ember from 'ember';
import duration from 'ember-moment/computeds/duration';

const {
  computed
} = Ember;

const component = Ember.Component.extend({
  classNames: ['st-score'],

  isOpen: false,

  durationMoment: duration('score.durationMilliseconds'),
  durationAsSeconds: computed('durationMoment', function () {
    return this.get('durationMoment').asSeconds();
  }),

  otherStartTime: computed('score.details.startTime', function () {
    return this.get('score.details.startTime')
  }),

  actions: {
    toggle() {
      this.toggleProperty('isOpen')
    }
  }
});

component.reopenClass({
  positionalParams: ['score']
})

export default component
