import DS from 'ember-data';

var attr = DS.attr;
var hasMany = DS.hasMany;
var belongsTo = DS.belongsTo;

export default DS.Model.extend({
  name: attr('string'),
  description: attr('string'),
  author: belongsTo('user', { async: true }),

  items: hasMany('item', { async: true })
});
