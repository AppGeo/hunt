import Ember from 'ember';
import DS from 'ember-data';

var attr = DS.attr;
var hasMany = DS.hasMany;
var belongsTo = DS.belongsTo;

export default DS.Model.extend({
  name: attr('string'),
  description: attr('string'),
  location: attr(),
  author: belongsTo('user', { async: true }),

  items: hasMany('item', { async: true }),

  markers: L.featureGroup(),

  setMarkers: Ember.on('init', Ember.observer('items.@each', function () {
    var group = this.get('markers');
    var items = this.get('items');

    if (items.get('length')) {
      items.forEach(function (item) {
        //TODO: location is undefined
        var location = item.get('location');

        if (location) {
          var marker = L.marker(item.get('location'));

          group.addLayer(marker);
        }
      });
    }
  }))
});
