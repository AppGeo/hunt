import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('hunt', { path: '/hunt/:hunt_id' }, function () {
  
  });
  this.route('login');
  this.route('new');
});

export default Router;
