import DS from 'ember-data';
import PartialModelRESTSerializer from 'ember-data-partial-model/mixins/rest-serializer';
const { RESTSerializer } = DS;

export default RESTSerializer.extend(PartialModelRESTSerializer, {
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
