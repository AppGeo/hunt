export function initialize(container, application) {
  application.inject('view', 'mapService', 'service:map');
  application.inject('route', 'mapService', 'service:map');
  application.inject('controller', 'mapService', 'service:map');
}

export default {
  name: 'map-service',
  initialize: initialize
};
