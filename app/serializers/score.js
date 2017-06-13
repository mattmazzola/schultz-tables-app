import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalize(modelClass, resourceHash, prop) {
    // embedded?
    // resourceHash.user = { id: resourceHash.userId };

    resourceHash.links = {
      user: `/api/users/${resourceHash.userId}`,
      scoreDetails: `/api/scores/${resourceHash.scoreDetailsId}/details`
    }

    return this._super(modelClass, resourceHash, prop);
  }
});
