import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  location: attr(),
  description: attr('string'),
  clue: attr('string')
});
