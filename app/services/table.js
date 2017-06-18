import Ember from 'ember';
import fetch from "ember-network/fetch";
import config from '../config/environment';

const {
  inject
} = Ember;

export default Ember.Service.extend({
  session: inject.service('session'),

  fetchStartTime() {
    const accessToken = this.get('session').get('data.authenticated.access_token');

    return fetch(`${config.apiUrl}/api/scores/start`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(`Error during signed time fetch`);
      })
      .then(json => json.value);
  },

  saveScore(scoreInput) {
    const accessToken = this.get('session').get('data.authenticated.access_token');

    return fetch(`${config.apiUrl}/api/scores/scores`, {
      method: 'POST',
      headers: {
        Accepts: 'application-json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(scoreInput)
    })
      .then(response => {
        return response.json()
          .then(json => {
            if (response.ok) {
              return json
            }
            throw new Error(json);
          });
      });
  }
});
