import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    nextStop: function () {
      // Save this item to a global object. This is a hackathon, right?
      var items = window.items || [];
      items.push(this.get('model'));
      window.items = items;

      // Go to next item by creating the next model.
      var newItem = this.store.createRecord('item', { number: items.length + 1 });
      this.set('model', newItem);
    },

    finishHunt: function () {
      this.transitionToRoute('item.done');
    }

  }

});
