import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import PartialModelAdapter from 'ember-data-partial-model/mixins/adapter';
import config from '../config/environment';
const { RESTAdapter } = DS;

export default RESTAdapter.extend(DataAdapterMixin, PartialModelAdapter, {
  authorizer: 'authorizer:oauth2',
  host: config.apiUrl,
  namespace: 'api'
});
