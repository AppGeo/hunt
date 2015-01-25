import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Route.extend({
  ref: new Firebase('https://scorching-heat-6592.firebaseio.com/hunts'),

  model: function () {
    var self = this;

    // Get last 10 added, load location based ones after getting location
    this.ref.limitToLast(10).on('child_added', function (snapshot) {
      var data = snapshot.val();

      data.id = snapshot.key();

      if (data.items) {
        data.items = Ember.keys(data.items);
      }

      self.store.push(self.container.lookupFactory('model:hunt'), data);
    });

    return this.store.all('hunt');
  }
});
