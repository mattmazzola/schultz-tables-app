import DS from 'ember-data';

const {
  attr
} = DS

export default DS.Model.extend({
  email: attr('string'),
  cover: attr('string'),
  firstName: attr('string'),
  gender: attr('string'),
  lastName: attr('string'),
  link: attr('string'),
  locale: attr('string'),
  minAgeRange: attr('number'),
  name: attr('string'),
  picture: attr('string'),
  provider: attr('string'),
  timezone: attr('number'),
  updatedTime: attr('string'),
  providerId: attr('string'),
  verified: attr('string')
});
