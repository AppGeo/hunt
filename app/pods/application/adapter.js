/* globals Firebase */
import DS from 'ember-data';

export default DS.FirebaseAdapter.extend({
  firebase: new Firebase("https://scorching-heat-6592.firebaseio.com")
});
