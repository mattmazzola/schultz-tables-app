import DS from 'ember-data';

const {
  attr
} = DS;

export default DS.Model.extend({
  startTime: attr(),
  endTime: attr('string'),
  sequence: attr(),
  tableLayout: attr(),
  tableType: attr()
});
