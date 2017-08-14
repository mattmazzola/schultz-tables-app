import DS from 'ember-data';
import { PartialModel, partial } from 'ember-data-partial-model/utils/model';
const { attr } = DS;

export default PartialModel.extend({
  email: attr('string'),
  name: attr('string'),
  extended: partial('user', 'extended', {
    scores: attr()
  })
});
