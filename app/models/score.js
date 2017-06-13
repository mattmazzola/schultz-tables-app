import DS from 'ember-data';

const {
  attr,
  belongsTo
} = DS;

export default DS.Model.extend({
  user: belongsTo('user', { inverse: null }),
  duration: attr('string'),
  durationMilliseconds: attr('number'),
  details: belongsTo('score-detail', { inverse: null })
});
