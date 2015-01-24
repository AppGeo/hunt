import Ember from 'ember';

export default Ember.Object.extend({
  user: undefined,
  isAnonymous: Ember.computed.equal('user.provider', 'anonymous')
});
