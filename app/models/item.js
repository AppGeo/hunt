import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  number: attr('number'),
  location: attr('string'),
  clue: attr('string')
});
