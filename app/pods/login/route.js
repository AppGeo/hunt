import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    login: function (type) {
      var self = this;
      var ref = new Firebase('https://scorching-heat-6592.firebaseio.com');
      var options = {
        scope: 'email'
      };

      // prefer pop-ups, so we don't navigate away from the page
      ref.authWithOAuthPopup(type, function(error, authData) {
        if (error) {
          if (error.code === 'TRANSPORT_UNAVAILABLE') {
            // fall-back to browser redirects, and pick up the session
            // automatically when we come back to the origin page
            ref.authWithOAuthRedirect(type, function(error, authData) {
              if (error) {
                return console.error(error);
              }

              self.set('session.user', authData);
              self.transitionTo('index');
            }, options);
          }
        } else if (authData) {
          // user authenticated with Firebase
          self.set('session.user', authData);
          self.transitionTo('index');
        }
      }, options);
    }
  }
});
