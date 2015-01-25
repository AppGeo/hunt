import Ember from 'ember';
import DataRoute from 'ember-data-route/mixins/data-route';

export default Ember.Route.extend(DataRoute, {
  model: function () {
    var user = this.get('session.user');
    var hunt = this.store.createRecord('hunt');

    hunt.set('author', user);

    if (window.items) {
      hunt.get('items').addObjects(window.items);
    }

    return hunt;
  },

  setupController: function (controller, model) {
    this._super(controller, model);

    var map = this.get('mapService.map');
    var markers = model.get('markers');

    if (markers) {
      map.addLayer(markers);
    }
  },

  willTransitionConfirm: function () {
    return window.confirm('You have unsaved changes that will be lost. Do you want to continue?');
  },

  actions: {
    create: function (model) {
      var self = this;

      model.save()
        .then(function (data) {
          console.log(data);
          self.transitionTo('hunt', data[1].id);
        }, function (error) {
          console.error(error);
        });
    }
  }
});
