import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    nextStop: function () {
      var model = this.get('model');
      var map = this.get('mapService.map');

      addItem(model);

      if (model.marker) {
        map.removeLayer(model.marker);
      }

      // Go to next item by creating the next model.
      var newItem = this.store.createRecord('item', { number: window.items.length + 1 });

      this.set('model', newItem);
    },

    finishHunt: function () {
      addItem(this.get('model'));
      this.transitionToRoute('item.done');
    }

  }

});

function addItem(item) {
  // Save this item to a global object. This is a hackathon, right?
  var items = window.items || [];

  if (item.get('clue')) {
    items.push(item);
  }

  window.items = items;
}
