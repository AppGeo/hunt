export function initialize(container, application) {
  application.inject('view:application', 'mapService', 'service:map');
}

export default {
  name: 'map-service',
  initialize: initialize
};
