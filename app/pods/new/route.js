import Ember from 'ember';
import DataRoute from 'ember-data-route/mixins/data-route';

export default Ember.Route.extend(DataRoute, {
  model: function () {
    var user = this.get('session.user');
    var hunt = this.store.createRecord('hunt');

    hunt.set('author', user);

    return hunt;
  },

  setupController: function (controller, model) {
    this._super(controller, model);

    var map = this.get('mapService.map');
    map.addLayer(model.get('markers'));
  },

  willTransitionConfirm: function () {
    return window.confirm('You have unsaved changes that will be lost. Do you want to continue?');
  },

  actions: {
    create: function (model) {
      var self = this;
      var map = this.get('mapService.map');
      var markers = model.get('markers');
      var huntCenter = markers.getBounds().getCenter();

      model.set('location', [huntCenter.lat, huntCenter.lng]);

      Ember.RSVP.all([model.get('items').invoke('save'), model.save()])
        .then(function (data) {
          console.log(data);
          map.removeLayer(markers);
          self.transitionTo('hunt', data[1].id);
        }, function (error) {
          console.error(error);
        });
    },

    addItem: function (model) {
      var map = this.get('mapService.map');
      var targetLatLng = map.getCenter();
      var targetPoint = map.project(targetLatLng, map.getZoom()).subtract([map.getSize().x / 4, 0]),
          targetLatLng = map.unproject(targetPoint, map.getZoom());
      var marker = L.marker(targetLatLng, {
        draggable: true
      });
      var items = model.get('items');
      var item = this.store.createRecord('item', {
        location: [targetLatLng.lat, targetLatLng.lng],
        clue: '',
        description: items.get('length') + 1
      });

      var popup = L.popup()
        .setContent('<p>Move me to the right location!</p>');

      marker.on('dragend', function () {
        var ll = marker.getLatLng();

        item.set('location', [ll.lat, ll.lng]);
      });

      model.get('markers').addLayer(marker);
      marker.bindPopup(popup);
      marker.openPopup();
      model.get('items').addObject(item);
    }
  }
});
