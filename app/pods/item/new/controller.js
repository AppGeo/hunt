import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    nextStop: function () {
      addItem(this.get('model'));

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
  items.push(item);
  window.items = items;
}
