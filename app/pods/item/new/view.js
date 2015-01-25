import Ember from 'ember';

export default Ember.View.extend({

  addMapClickEvent: function () {
    var map = this.get('mapService').map;
    this.onMapClick = onMapClick.bind(this);
    map.on('click', this.onMapClick);
  }.on('didInsertElement'),

  removeMapClickEvent: function () {
    var map = this.get('mapService').map;
    map.off('click', this.onMapClick);
  }.on('willDestroyElement')

});

function onMapClick (e) {
  console.log('onMapClick', e);
  var latlng = e.latlng.lat + ',' + e.latlng.lng;
  this.get('controller.model').set('location', latlng);
}
