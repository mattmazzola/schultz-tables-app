import Ember from 'ember';

const component = Ember.Component.extend({
  classNames: ['st-user'],

  isOpen: false,

  actions: {
    toggle() {
      this.toggleProperty('isOpen')
    }
  }
});

component.reopenClass({
  positionalParams: ['user']
})

export default component;