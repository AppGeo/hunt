import Ember from 'ember';

export default Ember.Route.extend({
  ref: new Firebase('https://scorching-heat-6592.firebaseio.com'),

  beforeModel: function () {
    var self = this;
    var token = localStorage.getItem('token');

    if (token) {
      this.ref.authWithCustomToken(token, function(error, authData) {
        if (!error) {
          self.store.find('user', authData.uid)
            .then(function (user) {
              self.set('session.user', user);
            }, function (error) {
              console.error(error);
            });
        }
      });
    }
    else {
      this.ref.authAnonymously(function (err, authData) {
        self.set('session.user', authData);
      });
    }
  },

  actions: {
    login: function (type) {
      var self = this;
      var options = {
        scope: 'email'
      };

      // prefer pop-ups, so we don't navigate away from the page
      this.ref.authWithOAuthPopup(type, function(error, authData) {
        if (error) {
          if (error.code === 'TRANSPORT_UNAVAILABLE') {
            // fall-back to browser redirects, and pick up the session
            // automatically when we come back to the origin page
            self.ref.authWithOAuthRedirect(type, function(error, authData) {
              if (error) {
                return console.error(error);
              }

              //self.set('session.user', authData);
              //self.transitionTo('index');
              self.handleAuth(authData);
            }, options);
          }
        } else if (authData) {
          // user authenticated with Firebase
          //self.set('session.user', authData);
          //self.transitionTo('index');
          self.handleAuth(authData);
        }
      }, options);
    },

    logout: function () {
      localStorage.removeItem('token');
      this.ref.unauth();
      this.set('session.user', undefined);
      this.transitionTo('index');
    }
  },

  handleAuth: function (authData) {
    var self = this;

    this.store.find('user', authData.uid)
      .then(function (user) {
        localStorage.setItem('token', authData.token);
        self.set('session.user', user);
        self.transitionTo('index');
      }, function (error) {
        var google = authData.google;
        var data = {
          name: google.displayName,
          email: google.email,
          provider: authData.provider,
          location: []
        };

        // Hack, since createRecord desn't work with an id..
        self.ref.child('users').child(authData.uid).set(data);
        data.id = authData.uid;

        var user = self.store.push('user', data);

        localStorage.setItem('token', authData.token);
        self.set('session.user', user);
        self.transitionTo('index');
      })
      .catch(function (error) {
        console.error(error);
      });
  }
});
