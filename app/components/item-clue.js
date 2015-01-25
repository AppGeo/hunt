import Ember from 'ember';

export default Ember.Component.extend({
  distanceChanging: Ember.on('init', Ember.observer('currentLocation', 'item.location', function () {
    var current = this.get('currentLocation');
    var itemLocation = this.get('item.location');
    var itemLatLng;

    if (itemLocation && current) {
      itemLatLng = L.latLng(itemLocation);

      if (itemLatLng.distanceTo(current) < 300) {
        this.set('inProximity', true);
      }
    }
  })),

  actions: {
    complete: function () {
      this.sendAction('itemComplete');
    }
  }
});

