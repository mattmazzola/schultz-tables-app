import DS from 'ember-data';
import { PartialModel, partial } from 'ember-data-partial-model/utils/model';
const { attr, belongsTo } = DS;

export default PartialModel.extend({
  user: belongsTo('user', { inverse: null }),
  duration: attr('string'),
  durationMilliseconds: attr('number'),
  extended: partial('score', 'extended', {
    startTime: attr(),
    endTime: attr('string'),
    sequence: attr(),
    tableLayout: attr(),
    tableType: attr()
  })
});
