export function initialize(container, application) {
  application.inject('controller', 'session', 'service:session');
  application.inject('route', 'session', 'service:session');
}

export default {
  name: 'session-service',
  initialize: initialize
};
