import Ember from 'ember';
import moment from 'moment';

export function stTimeDifference([timeA, timeB]/*, hash*/) {
  return moment.duration(moment(timeA).diff(moment(timeB))).asSeconds();
}

export default Ember.Helper.helper(stTimeDifference);
