import Ember from 'ember';
import DataRoute from 'ember-data-route/mixins/data-route';

export default Ember.Route.extend(DataRoute, {
  model: function () {
    return this.store.createRecord('hunt');
  },

  willTransitionConfirm: function() {
    return window.confirm('You have unsaved changes that will be lost. Do you want to continue?');
  },

  actions: {
    create: function (model) {
      model.save()
        .then(function (data) {
          console.log(data);
        }, function (error) {
          console.error(error);
        });
    },

    addItem: function (model) {
      var item = this.store.createRecord('item');

      model.get('item').addObject(item);
      model.save()
        .then(function (data) {
          console.log(data);
        }, function (error) {
          console.error(error);
        });
    }
  }
});
