import Ember from 'ember';

const component = Ember.Component.extend({
  classNames: ['st-score'],

  isOpen: false,

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
