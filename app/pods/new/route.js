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
    map.addLayer(model.markers);
  },

  willTransitionConfirm: function () {
    return window.confirm('You have unsaved changes that will be lost. Do you want to continue?');
  },

  actions: {
    create: function (model) {
      var self = this;

      Ember.RSVP.all([model.get('items').invoke('save'), model.save()])
        .then(function (data) {
          console.log(data);
          self.transitionTo('hunt', data[1].id);
        }, function (error) {
          console.error(error);
        });
    },

    addItem: function (model) {
      var map = this.get('mapService.map');
      var marker = L.marker(map.getCenter());
      var items = model.get('items');
      var item = this.store.createRecord('item', {
        location: [40, -70],
        clue: '',
        description: items.get('length') + 1
      });

      model.markers.addLayer(marker);
      model.get('items').addObject(item);
    }
  }
});
