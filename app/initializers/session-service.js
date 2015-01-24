export function initialize(container, application) {
  application.inject('controller', 'session', 'service:session');
}

export default {
  name: 'session-service',
  initialize: initialize
};
