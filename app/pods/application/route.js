import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    var self = this;
    var ref = new Firebase('https://scorching-heat-6592.firebaseio.com');

    ref.authAnonymously(function (err, authData) {
      localStorage.setItem('anonymouseUser', authData);
      self.set('session.user', authData);
    });
  }
});
