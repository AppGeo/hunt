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
  var self = this;

  Ember.run(function () {
    var map = self.get('mapService.map');
    var model = self.get('controller.model');
    var latlng = e.latlng.lat + ',' +  e.latlng.lng;
    var marker = L.marker(e.latlng);

    console.log('onMapClick', e);
    map.addLayer(marker);
    model.set('location', latlng);
    model.marker = marker;
  });
}
