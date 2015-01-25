import Ember from 'ember';

export default Ember.Controller.extend({
  itemCount: 0,

  currentItem: Ember.computed('model.items', 'itemCount', function () {
    var itemCount = this.get('itemCount');
    var items = this.get('model.items');

    if (items && itemCount < items.get('length')) {
      return items.objectAt(itemCount);
    }
  }),

  actions: {
    nextItem: function () {
      this.incrementProperty('itemCount');
    }
  }
});
