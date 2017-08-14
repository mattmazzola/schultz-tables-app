import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    return this._normalizeResponse(store, primaryModelClass, payload, id, requestType, false);
  },
  
  normalize(modelClass, resourceHash, prop) {
    // Set user proprty to the userId to fetch side loaded model
    resourceHash.user = resourceHash.userId;

    return this._super(modelClass, resourceHash, prop);
  }
});
