import DS from 'ember-data';

const {
  attr,
  belongsTo
} = DS;

export default DS.Model.extend({
  user: belongsTo('user', { inverse: null }),
  duration: attr('string'),
  tableLayoutId: attr('string'),
  tableTypeId: attr('string')
});