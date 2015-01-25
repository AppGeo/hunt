import Ember from 'ember';

export default Ember.Controller.extend({
  followingLocation: Ember.computed.alias('mapService.followingLocation'),

  locationChanged: Ember.on('init', Ember.observer('followingLocation', function () {
    var location = this.get('followingLocation');

    console.log(location);
  })),

  drawMarkers: Ember.on('init', Ember.observer('model.@each.location', function () {
    var models = this.get('model');
    var map = this.get('mapService.map');

    if (!models) {
      return;
    }

    models.forEach(function (item) {
      map.addLayer(item.get('markers'));
    });
  }))
});
