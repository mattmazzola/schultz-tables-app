import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalize(modelClass, resourceHash, prop) {
    // Set user proprty to the userId to fetch side loaded model
    // resourceHash.user = resourceHash.userId;

    // Set link to fetch record asynchronously
    resourceHash.links = {
      details: `/api/scores?userId=${resourceHash.id}`,
      scores: `/api/scores?userId=${resourceHash.id}`
    }

    return this._super(modelClass, resourceHash, prop);
  }
});
