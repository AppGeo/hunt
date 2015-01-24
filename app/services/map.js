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
    L.tileLayer('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.jpg', {
      attribution: '<a id="home-link" target="_top" href="../">Map tiles</a> by <a target="_top" href="http://stamen.com">Stamen Design</a>, under <a target="_top" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    }).addTo(map);

    this.initLocate(map);
    this.set('map', map);
    this.set('$container', $container);
  }.on('init'),

  initLocate: function (map) {
    var lc = L.control.locate({
      watch: true,
      enableHighAccuracy: true
    }).addTo(map);

    lc.start();
  },

  attachTo: function ($el) {
    var $container = this.get('$container');
    var map = this.get('map');

    $container.appendTo($el);
    map.invalidateSize(true);
  }
});
