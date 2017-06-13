import DS from 'ember-data';

const {
  attr
} = DS;

export default DS.Model.extend({
  sequence: attr(),
  tableLayout: attr(),
  tableType: attr()
});
