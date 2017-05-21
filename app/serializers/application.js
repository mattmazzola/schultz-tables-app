import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  serializeIntoHash(hash, typeClass, snapshot, options) {
    const newHash = this.serialize(snapshot, options);
    Object.assign(hash, newHash)
  },

  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    let normalizedRootKey = this.payloadKeyFromModelName(primaryModelClass.modelName);
    
    return this._super(store, primaryModelClass, { [normalizedRootKey]: payload }, id, requestType);
  },

  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    let normalizedRootKey = this.payloadKeyFromModelName(primaryModelClass.modelName);

    return this._super(store, primaryModelClass, { [normalizedRootKey]: payload }, id, requestType);
  }
});
