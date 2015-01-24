import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("hunt");
  this.route("login");
  this.route("new");
});

export default Router;
