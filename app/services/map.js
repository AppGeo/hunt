import Ember from 'ember';

export default Ember.Object.extend({
  map: null,

  initMap: function (options) {
    var $container = Ember.$('<div/>');
    var map;

    options = options || {};

    $container.attr('id', options.containerId || 'map');
    map = L.map($container.get(0), {
      center: new L.LatLng(41.80408, -72.47131),
      zoom: 14,
      maxZoom: 18
    });

    L.Icon.Default.imagePath = 'assets/images';
    L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
      attribution: 'Tiles by <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      subdomains: '1234'
    }).addTo(map);

    this.initLocate(map);
    this.set('map', map);
    this.set('$container', $container);
    window.map = map;
  }.on('init'),

  initLocate: function (map) {
    var self = this;
    var lc = L.control.locate({
      follow: true,
      locateOptions: {
        watch: true,
        enableHighAccuracy: true
      }
    }).addTo(map);

    lc.start();

    map.on('locationfound', function () {
      Ember.run(function () {
        self.set('followingLocation', map.getCenter());
      });
    });
  },

  attachTo: function ($el) {
    var $container = this.get('$container');
    var map = this.get('map');

    $container.appendTo($el);
    map.invalidateSize(true);
  }
});
