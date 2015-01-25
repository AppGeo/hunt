import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    nextStop: function () {
      // Save this stop to a global object. This is a hackathon, right?
      var stops = window.stops || [];
      stops.push(this.get('model'));
      window.stops = stops;

      // Go to next stop by creating the next model.
      var newStop = this.store.createRecord('stop', { number: stops.length + 1 });
      this.set('model', newStop);
    },

    finishHunt: function () {
      //this.transitionToRoute('hunt.new');
    }

  }

});
