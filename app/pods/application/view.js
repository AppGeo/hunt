import Ember from 'ember';

export default Ember.View.extend({
  initLeaflet: function () {
    this.get('mapService').attachTo(this.$());
  }.on('didInsertElement'),
});
