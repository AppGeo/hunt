import Ember from 'ember';
import DataRoute from 'ember-data-route/mixins/data-route';

export default Ember.Route.extend(DataRoute, {
  model: function () {
    var user = this.get('session.user');
    var hunt = this.store.createRecord('hunt');

    hunt.set('author', user);
		hunt.set('items', window.items);

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
    }
  }
});
